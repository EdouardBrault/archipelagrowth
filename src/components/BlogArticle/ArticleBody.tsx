import { useMemo } from "react";
import DOMPurify from "dompurify";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function injectHeadingIds(html: string): string {
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (_match, tag, attrs, content) => {
    const id = slugify(content);
    // Remove any existing id
    const cleanAttrs = attrs.replace(/\s*id="[^"]*"/g, "");
    return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
  });
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(html: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const regex = /<(h[23])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ").trim();
    const level = match[1].toLowerCase() === "h2" ? 2 : 3;
    headings.push({ id: slugify(match[2]), text, level });
  }
  return headings;
}

interface ArticleBodyProps {
  html: string;
}

const ArticleBody = ({ html }: ArticleBodyProps) => {
  const processedHtml = useMemo(() => {
    const sanitized = DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
    });
    return injectHeadingIds(sanitized);
  }, [html]);

  return (
    <div
      className="article-body prose prose-lg max-w-none text-gray-700 leading-[1.9]"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};

export default ArticleBody;
