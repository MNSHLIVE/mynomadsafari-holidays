import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/section-heading";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Budget Destinations in India",
    excerpt: "Discover incredible places to visit in India without breaking the bank. From the beaches of Goa to the mountains of Himachal Pradesh.",
    content: "India offers an incredible variety of experiences for budget travelers. In this guide, we explore the top 5 destinations that provide amazing cultural experiences, delicious food, and breathtaking scenery without costing a fortune. From the golden beaches of Goa to the majestic mountains of Himachal Pradesh, these destinations offer excellent value for money while delivering authentic Indian experiences.",
    date: "May 10, 2023",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800",
    tags: ["Budget Travel", "India", "Travel Tips"],
    featured: true
  },
  {
    id: 2,
    title: "How to Plan a Luxury Bali Trip",
    excerpt: "Planning a luxury getaway to Bali? Here's everything you need to know about the best resorts, dining experiences, and private tours.",
    content: "Bali is synonymous with luxury travel for many reasons - pristine beaches, world-class resorts, exquisite dining, and personalized service. This comprehensive guide helps you plan the ultimate luxury trip to Bali, from selecting the perfect villa or resort to booking exclusive experiences. Learn about the most luxurious accommodations in Ubud, Seminyak, and Nusa Dua, and discover how to enjoy private tours of temples, rice terraces, and hidden beaches.",
    date: "April 22, 2023",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=800",
    tags: ["Luxury Travel", "Bali", "Indonesia"],
    featured: false
  },
  {
    id: 3,
    title: "The Complete Guide to Visa Requirements",
    excerpt: "Navigate the complex world of travel visas with our comprehensive guide to requirements for popular destinations.",
    content: "Understanding visa requirements is essential for smooth international travel. This comprehensive guide breaks down the visa requirements for popular destinations around the world, providing up-to-date information on application processes, fees, and timeline expectations. We include tips for strengthening your visa application, common reasons for rejection, and special considerations for different passport holders.",
    date: "March 15, 2023",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1580889240911-2ce51b401e15?q=80&w=800",
    tags: ["Travel Tips", "Visa", "International Travel"],
    featured: false
  },
  {
    id: 4,
    title: "Best Time to Visit Rajasthan: A Seasonal Guide",
    excerpt: "Learn about the ideal seasons to explore the colorful state of Rajasthan, from pleasant winters to vibrant festivals.",
    content: "Rajasthan, the land of kings, offers different experiences throughout the year. This seasonal guide helps you determine the best time to visit based on weather, festivals, and crowd levels. Winter (October to March) brings pleasant temperatures perfect for exploring forts and palaces, while the shoulder seasons offer fewer crowds and better hotel rates. We also cover special events like the Pushkar Camel Fair, Desert Festival in Jaisalmer, and Holi celebrations that might influence your travel planning.",
    date: "February 28, 2023",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
    tags: ["India", "Rajasthan", "Travel Tips", "Best Time to Visit"],
    featured: false
  },
  {
    id: 5,
    title: "10 Must-Try Street Foods in Thailand",
    excerpt: "Take your taste buds on a journey through Thailand's vibrant street food scene with these essential dishes.",
    content: "Thailand's street food is legendary for good reason - it's a perfect blend of fresh ingredients, complex flavors, and surprising textures. This culinary guide introduces you to 10 must-try street foods, from the ubiquitous Pad Thai to lesser-known regional specialties. For each dish, we provide information on what makes it special, where to find the best versions, and how to order like a local. Whether you're a first-time visitor or returning food enthusiast, these dishes will enrich your Thai travel experience.",
    date: "January 17, 2023",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
    tags: ["Thailand", "Food", "Street Food", "Culinary Travel"],
    featured: true
  },
  {
    id: 6,
    title: "Sustainable Travel: How to Minimize Your Environmental Impact",
    excerpt: "Learn practical tips for responsible travel that helps protect the destinations you love to visit.",
    content: "As global tourism increases, so does our responsibility to travel sustainably. This guide provides practical advice for minimizing your environmental impact while traveling, from choosing eco-friendly accommodations to reducing plastic waste and supporting local communities. We discuss carbon offset programs, sustainable transportation options, and how to identify genuinely eco-conscious tour operators. With these tips, you can enjoy memorable travel experiences while helping to preserve destinations for future generations.",
    date: "December 5, 2022",
    author: "Travel Expert",
    imageSrc: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=800",
    tags: ["Sustainable Travel", "Eco-Tourism", "Travel Tips", "Responsible Travel"],
    featured: false
  }
];

// All available tags from blog posts
const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter blog posts based on search term and selected tags
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Back to Home</Link>
          </Button>
        </div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Travel Tips & Inspiration
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover travel insights, destination guides, and expert advice
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mb-16">
        {/* Featured Posts */}
        {searchTerm === "" && selectedTags.length === 0 && (
          <div className="mb-16">
            <SectionHeading
              title="Featured Articles"
              subtitle="Hand-picked stories to inspire your next adventure"
              align="left"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <div 
                  key={post.id}
                  className="group overflow-hidden rounded-xl relative flex flex-col bg-card border border-border/50 shadow-sm card-hover h-full"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={post.imageSrc}
                      alt={post.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline"
                          className="cursor-pointer hover:bg-secondary/20"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline">+{post.tags.length - 2}</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground border-t border-border/50">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-20 space-y-8">
              {/* Categories / Tags */}
              <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Tags</h3>
                  {selectedTags.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedTags([])}
                      className="h-8 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 4)
                    .map((post) => (
                      <div key={post.id} className="flex items-start space-x-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={post.imageSrc} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.date}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get travel tips, destination guides, and exclusive offers directly to your inbox.
                </p>
                <div className="space-y-2">
                  <Input placeholder="Your email address" type="email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog Posts */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Filter indicators */}
            {(searchTerm !== "" || selectedTags.length > 0) && (
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">Active filters:</span>
                  
                  {searchTerm !== "" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {searchTerm}
                      <button onClick={() => setSearchTerm("")} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => toggleTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8"
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    imageSrc={post.imageSrc}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    author={post.author}
                    tags={post.tags}
                    link={`/blog/${post.id}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
