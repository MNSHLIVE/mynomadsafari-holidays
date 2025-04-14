
const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Travel Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Blog Post 1 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/Home/Blog/Budget-Destinatons.jpg" 
            alt="Budget Travel Destinations" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">April 10, 2025</span>
            <h2 className="text-xl font-bold mt-2">Top 10 Budget-Friendly Destinations for 2025</h2>
            <p className="mt-2 text-muted-foreground">
              Discover amazing destinations that won't break the bank. From hidden gems in Southeast Asia to 
              affordable European getaways, these destinations offer incredible experiences at budget-friendly prices.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/Home/Blog/Luxury-Bali.jpg" 
            alt="Luxury Bali Retreats" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">March 25, 2025</span>
            <h2 className="text-xl font-bold mt-2">Luxury Retreats in Bali: A Paradise Experience</h2>
            <p className="mt-2 text-muted-foreground">
              Explore the most exclusive luxury retreats in Bali. From private pool villas to world-class 
              spa experiences, Bali offers the perfect setting for an indulgent vacation.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>

        {/* Blog Post 3 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/Home/Blog/Visa-Guide.jpg" 
            alt="Visa Application Guide" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">March 15, 2025</span>
            <h2 className="text-xl font-bold mt-2">Comprehensive Guide to Visa Applications</h2>
            <p className="mt-2 text-muted-foreground">
              Navigate the complex world of visa applications with our expert tips. Learn about documentation 
              requirements, common mistakes to avoid, and how to increase your chances of approval.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>

        {/* Blog Post 4 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/International/Gallary/Bangkok-Took Took.jpg" 
            alt="Thailand Travel Guide" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">March 5, 2025</span>
            <h2 className="text-xl font-bold mt-2">Ultimate Thailand Travel Guide: Beyond the Beaches</h2>
            <p className="mt-2 text-muted-foreground">
              Discover the hidden treasures of Thailand beyond its famous beaches. From mountain retreats 
              to cultural experiences in small villages, explore Thailand like a local.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>

        {/* Blog Post 5 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/Domestic/gallery/Rishikesh-Rafting.jpg" 
            alt="Adventure Travel" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">February 28, 2025</span>
            <h2 className="text-xl font-bold mt-2">Adventure Travel: Pushing Your Boundaries</h2>
            <p className="mt-2 text-muted-foreground">
              Ready for an adrenaline rush? From white water rafting in Rishikesh to trekking in the Himalayas, 
              discover the best adventure travel experiences across India and beyond.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>

        {/* Blog Post 6 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src="/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg" 
            alt="Religious Tourism" 
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <span className="text-xs font-semibold text-muted-foreground">February 15, 2025</span>
            <h2 className="text-xl font-bold mt-2">Spiritual Journeys: Religious Tourism in India</h2>
            <p className="mt-2 text-muted-foreground">
              Explore India's rich religious heritage through our guide to spiritual destinations. From the 
              Char Dham Yatra to the Golden Temple, discover places that offer both spiritual solace and cultural insights.
            </p>
            <a href="#" className="inline-block mt-4 text-primary font-medium">Read More →</a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <p className="mb-4">Stay updated with our latest travel tips, destination guides, and special offers.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 h-10 px-4 rounded border border-input"
              required 
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-6 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
