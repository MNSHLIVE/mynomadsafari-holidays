
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const ImageMigrationTool = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [homeImages, setHomeImages] = useState<any[]>([]);
  const [destinationImages, setDestinationImages] = useState<any[]>([]);
  const [tourImages, setTourImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImagesFromAllBuckets();
  }, []);

  const loadImagesFromAllBuckets = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchImagesFromBucket("home", setHomeImages),
        fetchImagesFromBucket("destinations", setDestinationImages),
        fetchImagesFromBucket("tours", setTourImages),
      ]);
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Error loading images from storage");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImagesFromBucket = async (bucketName: string, setImages: React.Dispatch<React.SetStateAction<any[]>>) => {
    const { data, error } = await supabase.storage.from(bucketName).list();
    
    if (error) {
      console.error(`Error fetching images from ${bucketName}:`, error);
      return;
    }
    
    // Get nested folders
    const folders = data.filter(item => item.id === null);
    let allFiles: any[] = data.filter(item => item.id !== null);
    
    // For each folder, get its contents
    for (const folder of folders) {
      const { data: folderData, error: folderError } = await supabase.storage
        .from(bucketName)
        .list(folder.name);
      
      if (!folderError && folderData) {
        const filesWithPath = folderData
          .filter(item => item.id !== null)
          .map(file => ({
            ...file,
            path: `${folder.name}/${file.name}`,
            folderName: folder.name
          }));
        allFiles = [...allFiles, ...filesWithPath];
      }
    }
    
    // Get URLs for all files
    const filesWithUrls = await Promise.all(allFiles.map(async file => {
      const path = file.path || file.name;
      const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
      return {
        ...file,
        url: data.publicUrl
      };
    }));
    
    setImages(filesWithUrls);
  };

  const uploadImage = async (file: File, bucket: string, path: string) => {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${path}:`, error);
      return false;
    }
    return true;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setProgress({ current: 0, total: files.length });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        let bucket = "home";
        let path = "general/";

        // Determine bucket and path based on file name or structure
        if (fileName.toLowerCase().includes("hero")) {
          path = "hero/";
        } else if (fileName.toLowerCase().includes("destination")) {
          bucket = "destinations";
          path = "domestic/";
        } else if (fileName.toLowerCase().includes("tour")) {
          bucket = "tours";
          path = "featured/";
        }

        const success = await uploadImage(file, bucket, path + fileName);
        if (success) {
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
        }
      }

      toast.success("Images uploaded successfully!");
      // Reload all images after upload completes
      await loadImagesFromAllBuckets();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  const renderImageGrid = (images: any[]) => {
    if (images.length === 0) {
      return <p className="text-center py-8 text-muted-foreground">No images found in this bucket</p>;
    }

    // Group by folder
    const groupedByFolder: Record<string, any[]> = {};
    images.forEach(img => {
      const folder = img.folderName || 'root';
      if (!groupedByFolder[folder]) {
        groupedByFolder[folder] = [];
      }
      groupedByFolder[folder].push(img);
    });

    return (
      <div className="space-y-6">
        {Object.entries(groupedByFolder).map(([folder, folderImages]) => (
          <div key={folder} className="space-y-3">
            <h3 className="text-lg font-medium capitalize">{folder}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {folderImages.map((img) => (
                <div key={img.id || img.name} className="border rounded-md overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs truncate" title={img.name}>
                      {img.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(img.metadata?.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Image Migration Tool</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="images" className="block text-sm font-medium mb-2">
            Select Images to Upload
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/90"
          />
        </div>

        {isUploading && (
          <div>
            <div className="text-sm text-muted-foreground">
              Uploading: {progress.current} / {progress.total}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div>
          <Button 
            onClick={loadImagesFromAllBuckets}
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Refresh Images'
            )}
          </Button>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home">
            {isLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading home images...</p>
              </div>
            ) : (
              renderImageGrid(homeImages)
            )}
          </TabsContent>
          
          <TabsContent value="destinations">
            {isLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading destination images...</p>
              </div>
            ) : (
              renderImageGrid(destinationImages)
            )}
          </TabsContent>
          
          <TabsContent value="tours">
            {isLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading tour images...</p>
              </div>
            ) : (
              renderImageGrid(tourImages)
            )}
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
          <p className="font-medium mb-2">Instructions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Select multiple images to upload</li>
            <li>Images will be automatically sorted into appropriate buckets based on filename</li>
            <li>
              <strong>Naming convention:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Files with "hero" in name → home/hero/</li>
                <li>Files with "destination" in name → destinations/domestic/</li>
                <li>Files with "tour" in name → tours/featured/</li>
                <li>Other files → home/general/</li>
              </ul>
            </li>
            <li>Supported formats: JPG, PNG, WebP</li>
            <li>Maximum file size: 5MB per image</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageMigrationTool;
