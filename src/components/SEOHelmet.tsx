import { Helmet } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
interface SEOHelmetProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  structuredData?: object;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleTag?: string[];
  section?: string;
}

const SEOHelmet = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "https://archipelagrowth.com/og-image.png",
  ogType = "website",
  keywords,
  structuredData,
  author,
  publishedTime,
  modifiedTime,
  articleTag,
  section
}: SEOHelmetProps) => {
  return (
    <ErrorBoundary fallback={null}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ArchipelaGrowth - GEO Agency" />
        
        {author && <meta name="author" content={author} />}
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        {section && <meta property="article:section" content={section} />}
        {articleTag && articleTag.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        {author && <meta name="twitter:creator" content={`@${author.replace(/\s+/g, '')}`} />}
        
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
    </ErrorBoundary>
  );
};

export default SEOHelmet;
