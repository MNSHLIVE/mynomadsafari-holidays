
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ImageMigrationTool = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

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
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Image Migration Tool</h2>
      <div className="space-y-4">
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

        <div className="text-sm text-muted-foreground">
          <p>Instructions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Select multiple images to upload</li>
            <li>Images will be automatically sorted into appropriate buckets</li>
            <li>Supported formats: JPG, PNG, WebP</li>
            <li>Maximum file size: 5MB per image</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageMigrationTool;
