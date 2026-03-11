
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  featuredImage?: string;
  articleImage?: string;
  articleImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: string;
  faq?: FaqItem[]; // Deprecated, for backward compatibility
  faqSections?: FaqSection[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  id: string;
  title: string;
  questions: FaqItem[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}
