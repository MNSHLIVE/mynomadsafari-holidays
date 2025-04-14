
const Blog = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Travel Blog</h1>
        
        {/* Blog content without Layout wrapper */}
        <div className="grid grid-cols-1 gap-8">
          <p>Blog content will go here. This page has been updated to prevent duplicate layout components.</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
