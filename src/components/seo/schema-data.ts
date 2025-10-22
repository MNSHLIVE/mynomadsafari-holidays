
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
  "@type": "TravelAgency",
  "name": "My Nomadsafari Holidays",
  "alternateName": "My Nomad Safari Holidays",
  "url": "https://www.mynomadsafariholidays.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
    "width": "500",
    "height": "500"
  },
  "image": "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
  "description": "India's premier tour operators specializing in luxury safari holidays, religious tours, adventure travel, and customized tour packages. We offer end-to-end travel services including visa assistance, ticket booking, and 24/7 customer support for domestic and international destinations.",
  "email": "info@mynomadsafariholidays.in",
  "telephone": ["+91-9968682200", "+91-7042910449"],
  "priceRange": "₹₹-₹₹₹",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
  "currenciesAccepted": "INR",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "102 T.V Tower, Badlapur East",
      "addressLocality": "Thane",
      "addressRegion": "Maharashtra",
      "postalCode": "421503",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Dwarka Sec 3",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110078",
      "addressCountry": "IN"
    }
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "Country",
      "name": "International"
    }
  ],
  "geo": [
    {
      "@type": "GeoCoordinates",
      "latitude": "19.1557",
      "longitude": "73.2630"
    },
    {
      "@type": "GeoCoordinates",
      "latitude": "28.5921",
      "longitude": "77.0460"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/mynomadsafari",
    "https://www.instagram.com/mynomadsafari"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tour Packages",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Domestic Tours",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Trip",
              "name": "Kerala Tour Packages"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Trip",
              "name": "Rajasthan Heritage Tours"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Trip",
              "name": "Himachal Adventure Tours"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "International Tours",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Trip",
              "name": "Dubai Luxury Tours"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Trip",
              "name": "Singapore Tours"
            }
          }
        ]
      }
    ]
  }
});

// Create LocalBusiness schema for better local SEO
export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "My Nomadsafari Holidays",
  "image": "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png",
  "@id": "https://www.mynomadsafariholidays.in",
  "url": "https://www.mynomadsafariholidays.in",
  "telephone": "+91-9968682200",
  "priceRange": "₹₹-₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "102 T.V Tower, Badlapur East",
    "addressLocality": "Thane",
    "addressRegion": "Maharashtra",
    "postalCode": "421503",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1557,
    "longitude": 73.2630
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/mynomadsafari",
    "https://www.instagram.com/mynomadsafari"
  ]
});

// Create FAQ schema
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Create Review schema
export const createReviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "TravelAgency",
    "name": "My Nomadsafari Holidays"
  },
  "author": {
    "@type": "Person",
    "name": reviews[0]?.author
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": reviews[0]?.rating,
    "bestRating": "5"
  },
  "reviewBody": reviews[0]?.reviewBody,
  "datePublished": reviews[0]?.datePublished
});
