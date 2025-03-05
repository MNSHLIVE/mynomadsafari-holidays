
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import BlogCard from "@/components/blog-card";

interface BlogSectionProps {
  posts: Array<{
    imageSrc: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    tags: string[];
  }>;
}

const BlogSection = ({ posts }: BlogSectionProps) => {
  return (
    <section className="section-padding container mx-auto px-4">
      <SectionHeading
        title="Travel Tips & Inspiration"
        subtitle="Read our latest blog posts for travel tips, destination guides, and inspiration"
        tag="From Our Blog"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogCard
            key={index}
            imageSrc={post.imageSrc}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author}
            tags={post.tags}
            link="/blog"
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/blog">
          <Button variant="outline" className="group">
            <span>Read More Articles</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
