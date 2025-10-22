
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object | object[];
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage,
  structuredData,
  type = 'website',
  author,
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const defaultImage = "https://www.mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png";
  const baseUrl = "https://www.mynomadsafariholidays.in";
  
  // Generate canonical URL if not provided
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Language & Geo Tags */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="My Nomadsafari Holidays" />
      <meta property="og:locale" content="en_IN" />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@mynomadsafari" />
      <meta name="twitter:creator" content="@mynomadsafari" />
      
      {/* Mobile & Accessibility */}
      <meta name="theme-color" content="#16a34a" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="My Nomadsafari" />
      
      {/* Favicon & Icons */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href={defaultImage} />
      
      {/* Structured Data / JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
