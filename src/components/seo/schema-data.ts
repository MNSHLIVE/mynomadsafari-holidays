
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

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "My Nomadsafari Holidays",
  "url": "https://www.mynomadsafariholidays.in",
  "logo": "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
  "image": "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
  "description": "India's best tour operators for luxury safari holidays, adventure travel, and customized tour packages with end-to-end travel services",
  "email": "info@mynomadsafariholidays.in",
  "telephone": ["+91-9968682200", "+91-7042910449"],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "102 T.V Tower, Badlapur East",
      "addressLocality": "Thane",
      "addressRegion": "Mumbai",
      "postalCode": "421503",
      "addressCountry": "India"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Dwarka Sec 3",
      "addressLocality": "New Delhi",
      "postalCode": "110078",
      "addressCountry": "India"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/mynomadsafari",
    "https://www.instagram.com/mynomadsafari"
  ]
});
