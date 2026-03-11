import { Helmet } from "react-helmet-async";
import { BlogArticle } from "@/types/blog";
import ErrorBoundary from "@/components/ErrorBoundary";
interface FAQItem {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

interface StructuredDataProps {
  type: "organization" | "service" | "blog" | "article" | "faq";
  data?: BlogArticle | FAQItem[];
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseUrl = "https://archipelagrowth.com";
    
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ArchipelaGrowth - GEO Agency",
          "description": "#1 GEO Agency in the US specialized in AI Optimization and Generative Engine Optimization.",
          "url": baseUrl,
          "logo": `${baseUrl}/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.linkedin.com/company/archipelagrowth"
          ]
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "GEO Services - Generative Engine Optimization",
          "description": "Optimization services for AI search engines",
          "provider": {
            "@type": "Organization",
            "name": "ArchipelaGrowth"
          },
          "serviceType": "Digital Marketing",
          "areaServed": "United States"
        };

      case "blog":
        return {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "GEO Blog - ArchipelaGrowth",
          "description": "News and guides on Generative Engine Optimization",
          "url": `${baseUrl}/blog`,
          "publisher": {
            "@type": "Organization",
            "name": "ArchipelaGrowth"
          }
        };

      case "article":
        if (!data || Array.isArray(data)) return null;
        const article = data as BlogArticle;
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.publishedAt,
          "dateModified": article.publishedAt,
          "author": {
            "@type": "Organization",
            "name": article.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "ArchipelaGrowth",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${article.slug}`
          },
          "keywords": article.tags.join(", "),
          "articleSection": article.category
        };

      case "faq":
        if (!data || !Array.isArray(data)) return null;
        const faqItems = data as FAQItem[];
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.name,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.acceptedAnswer.text
            }
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <ErrorBoundary fallback={null}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    </ErrorBoundary>
  );
};

export default StructuredData;
