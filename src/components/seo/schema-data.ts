
export const createTouristDestinationSchema = (destination: string, description: string, image: string) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": destination,
  "description": description,
  "image": image,
  "url": `https://www.mynomadsafariholidays.in/destinations/${destination.toLowerCase().replace(/\s+/g, "-")}`,
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "India"
  },
  "touristType": ["leisure", "adventure", "cultural", "wildlife"]
});

export const createTourPackageSchema = (packageName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": packageName,
  "description": description,
  "provider": {
    "@type": "TravelAgency",
    "name": "My Nomadsafari Holidays",
    "url": "https://www.mynomadsafariholidays.in"
  },
  "itinerary": {
    "@type": "ItemList",
    "description": description
  },
  ...(price && {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "INR"
    }
  })
});

export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
