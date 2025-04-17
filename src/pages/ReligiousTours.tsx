
import React from 'react';
import CTASection from '@/components/cta-section';

const ReligiousTours = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Religious Tours</h1>
      
      <div className="prose max-w-none mb-8">
        <p className="text-lg">
          Embark on a spiritual journey with our carefully crafted religious tour packages. 
          We offer pilgrimages to sacred sites across India and around the world, 
          allowing you to connect with your faith while we handle all the logistics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="/public/Destination/Domestic/Tours/Pilgrimage/Hindu/CharDham/CharDham-Main.jpg.jpg" 
            alt="Char Dham Yatra"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Char Dham Yatra</h2>
            <p className="text-muted-foreground mb-4">
              Visit the four sacred sites of Yamunotri, Gangotri, Kedarnath, and Badrinath in the Himalayas.
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Duration:</span>
              <span className="text-sm">11-12 days</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Best Time:</span>
              <span className="text-sm">May-June, Sept-Oct</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="/public/Destination/Domestic/Tours/Pilgrimage/Hindu/Jyotirlinga/Jyotirlinga-Main.jpg.jpg" 
            alt="Jyotirlinga Darshan"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Jyotirlinga Darshan</h2>
            <p className="text-muted-foreground mb-4">
              Visit the sacred Jyotirlinga temples dedicated to Lord Shiva across India.
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Duration:</span>
              <span className="text-sm">Various packages</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Best Time:</span>
              <span className="text-sm">Year-round</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <img 
            src="/public/Destination/Home/Religious-Tours/Varanasi-Spiritual.jpg" 
            alt="Varanasi Spiritual Tour"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Varanasi Spiritual Tour</h2>
            <p className="text-muted-foreground mb-4">
              Experience the spiritual heart of India with a tour of sacred Varanasi.
            </p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Duration:</span>
              <span className="text-sm">3-5 days</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Best Time:</span>
              <span className="text-sm">Oct-Mar</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Religious Tours By Faith</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border rounded-lg text-center">
            <h3 className="font-medium mb-2">Hindu Pilgrimages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li>• Char Dham Yatra</li>
              <li>• Jyotirlinga Tours</li>
              <li>• Varanasi & Gaya</li>
              <li>• Shakti Peetha Tours</li>
              <li>• South India Temple Tours</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="font-medium mb-2">Buddhist Circuits</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li>• Bodh Gaya</li>
              <li>• Sarnath</li>
              <li>• Kushinagar</li>
              <li>• Lumbini (Nepal)</li>
              <li>• Tibetan Buddhism Tour</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="font-medium mb-2">Sikh Pilgrimages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li>• Golden Temple, Amritsar</li>
              <li>• Patna Sahib</li>
              <li>• Anandpur Sahib</li>
              <li>• Hemkund Sahib</li>
              <li>• Panj Takht Tour</li>
            </ul>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="font-medium mb-2">Jain Pilgrimages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li>• Palitana</li>
              <li>• Mount Abu</li>
              <li>• Shravanabelagola</li>
              <li>• Ranakpur Temple</li>
              <li>• Gomateshwara Circuit</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Religious Tour Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-3">What We Offer</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Expert guides knowledgeable in religious customs and traditions</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Accommodation near religious sites</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Assistance with religious rituals and ceremonies</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Vegetarian meal options available</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Special arrangements for elderly pilgrims</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Why Choose Our Religious Tours</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Respectful approach to sacred sites and customs</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Hassle-free arrangements for a peaceful spiritual journey</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Balance of spiritual activities and comfortable travel</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Options for both group and private pilgrimages</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary">✓</span>
                <span>Years of experience handling religious tours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <CTASection
        title="Begin Your Spiritual Journey"
        description="Contact us today to plan a meaningful pilgrimage to the sacred sites that matter most to you."
        buttonText="Plan Your Pilgrimage"
        buttonLink="/contact"
        imageSrc="/public/Destination/Home/Religious-Tours/Char-Dham.jpg"
        align="center"
      />
    </div>
  );
};

export default ReligiousTours;
