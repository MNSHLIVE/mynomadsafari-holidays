
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const BlogGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerateBlog = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic for the blog post');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const { data, error } = await supabase.functions.invoke('generate-blog', {
        body: {
          topic: topic.trim(),
          keywords: keywordArray
        }
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast.success('Blog post generated successfully!');
    } catch (error) {
      console.error('Error generating blog:', error);
      toast.error('Failed to generate blog post. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedTopics = [
    'Best Time to Visit Kerala Backwaters',
    'Rajasthan Royal Heritage Tour Guide',
    'Adventure Activities in Himachal Pradesh',
    'Bali vs Thailand: Which is Better for Families',
    'Dubai Shopping Festival Travel Guide',
    'Religious Tours in India: Char Dham Yatra',
    'Honeymoon Destinations in India',
    'Budget Travel Tips for Southeast Asia'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Blog Generator</h1>
        <p className="text-muted-foreground">Create engaging travel content with AI</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Generate New Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Blog Topic</label>
            <Input
              placeholder="e.g., Best Places to Visit in Kerala"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
            <Input
              placeholder="e.g., Kerala, backwaters, tourism, travel packages"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Suggested Topics</label>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setTopic(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleGenerateBlog}
            disabled={isGenerating || !topic.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating Blog Post...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Blog Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="min-h-96 font-mono text-sm"
              placeholder="Generated content will appear here..."
            />
            <div className="mt-4 flex gap-2">
              <Button onClick={() => navigator.clipboard.writeText(generatedContent)}>
                Copy to Clipboard
              </Button>
              <Button variant="outline" onClick={() => setGeneratedContent('')}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogGenerator;
