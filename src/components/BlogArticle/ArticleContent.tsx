import DOMPurify from 'dompurify';

interface ArticleContentProps {
  content: string;
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const ArticleContent = ({ content }: ArticleContentProps) => {
  const isHtmlContent = content.trim().startsWith('<') || content.includes('</p>') || content.includes('</h2>') || content.includes('</h3>');

  if (isHtmlContent) {
    return <HtmlArticleContent content={content} />;
  }

  return <MarkdownArticleContent content={content} />;
};

/** Inject IDs into h2/h3 tags so the TOC can link to them */
const injectHeadingIds = (html: string): string => {
  let counter = 0;
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    // Skip if already has an id
    if (/\bid\s*=/i.test(attrs)) return match;
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = `heading-${counter++}-${slugify(text)}`;
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
};

/** Render clean semantic HTML from TipTap — GEO-friendly output */
const HtmlArticleContent = ({ content }: { content: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'b', 'i', 'u',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'figure', 'figcaption',
      'hr',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'id', 'width', 'height', 'style'],
  });

  // Inject IDs into headings for TOC linking
  const htmlWithIds = injectHeadingIds(sanitizedHtml);

  return (
    <article
      className="
        prose prose-lg max-w-none
        text-gray-700 leading-[1.9]

        [&_h2]:font-jakarta [&_h2]:font-bold [&_h2]:text-[#010D3E] [&_h2]:text-2xl [&_h2]:md:text-3xl
        [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:scroll-mt-24
        [&_h2]:border-l-4 [&_h2]:border-[#0043F1] [&_h2]:pl-4

        [&_h3]:font-jakarta [&_h3]:font-semibold [&_h3]:text-[#010D3E] [&_h3]:text-xl [&_h3]:md:text-2xl
        [&_h3]:mt-14 [&_h3]:mb-5 [&_h3]:scroll-mt-24
        [&_h3]:border-l-3 [&_h3]:border-[#0043F1]/60 [&_h3]:pl-3

        [&_p]:text-gray-700 [&_p]:text-lg [&_p]:leading-[1.9] [&_p]:mb-6

        [&_strong]:text-[#010D3E] [&_strong]:font-semibold
        [&_em]:italic

        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
        [&_ul_li]:text-gray-700 [&_ul_li]:text-lg [&_ul_li]:leading-relaxed
        [&_ul_li::marker]:text-[#0043F1]

        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
        [&_ol_li]:text-gray-700 [&_ol_li]:text-lg [&_ol_li]:leading-relaxed
        [&_ol_li::marker]:text-[#0043F1] [&_ol_li::marker]:font-semibold

        [&_a]:text-[#0043F1] [&_a]:underline [&_a]:underline-offset-2
        [&_a:hover]:text-[#0043F1]/80 [&_a]:transition-colors

        [&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-8
        [&_img]:shadow-md [&_img]:mx-auto [&_img]:block

        [&_blockquote]:border-l-4 [&_blockquote]:border-[#0043F1]/30
        [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8
        [&_blockquote]:bg-[#F8F9FB] [&_blockquote]:rounded-r-lg
        [&_blockquote_p]:text-[#010D3E]/70 [&_blockquote_p]:italic

        [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:my-8
        [&_thead]:bg-[#F3F4F6]
        [&_th]:border [&_th]:border-[#E5E7EB] [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#010D3E]
        [&_td]:border [&_td]:border-[#E5E7EB] [&_td]:px-4 [&_td]:py-3 [&_td]:text-gray-600
        [&_tr:nth-child(even)]:bg-[#F9FAFB]

        [&_hr]:border-[#E5E7EB] [&_hr]:my-12
      "
      dangerouslySetInnerHTML={{ __html: htmlWithIds }}
    />
  );
};

/** Legacy markdown renderer for old articles */
const MarkdownArticleContent = ({ content }: { content: string }) => {
  const convertBoldMarkdown = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#010D3E] font-semibold">$1</strong>');
  };

  const renderContent = (raw: string) => {
    let normalizedContent = raw
      .replace(/\r\n/g, "\n")
      .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ")
      .replace(/[\u200B\u200C\u200D\uFEFF]/g, "")
      .replace(/\n{3,}/g, "\n\n");

    const headingLineRegex = /^[\t ]*?(#{1,6})[\t ]*?(.*?)[\t ]*?#*\s*$/;
    const listItemRegex = /^[\t ]*[-*+•]\s+(.+)/;

    const lines = normalizedContent.split("\n");
    const elements: React.ReactNode[] = [];
    let paraLines: string[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length === 0) return;
      const listHtml = `<ul class="list-disc pl-6 mb-6 space-y-2">
        ${listItems.map(item => `<li class="text-gray-700 text-lg leading-relaxed">${convertBoldMarkdown(item)}</li>`).join('')}
      </ul>`;
      const sanitized = DOMPurify.sanitize(listHtml, { ALLOWED_TAGS: ['ul', 'li', 'strong'], ALLOWED_ATTR: ['class'] });
      elements.push(<div key={key++} dangerouslySetInnerHTML={{ __html: sanitized }} />);
      listItems = [];
    };

    const flushParagraph = () => {
      const paragraph = paraLines.join("\n").trim();
      paraLines = [];
      if (!paragraph) return;

      if (paragraph.includes('<img')) {
        const sanitized = DOMPurify.sanitize(paragraph, { ALLOWED_TAGS: ['img', 'div'], ALLOWED_ATTR: ['src', 'alt', 'class', 'width', 'height', 'style'] });
        elements.push(<div key={key++} dangerouslySetInnerHTML={{ __html: sanitized }} className="my-8" />);
        return;
      }

      const boldConverted = convertBoldMarkdown(paragraph);
      const sanitized = DOMPurify.sanitize(boldConverted, { ALLOWED_TAGS: ['strong'], ALLOWED_ATTR: ['class'] });
      elements.push(
        <p key={key++} className="text-gray-700 mb-6 leading-[1.9] text-lg">
          <span dangerouslySetInnerHTML={{ __html: sanitized }} />
        </p>,
      );
    };

    lines.forEach((line, lineIndex) => {
      const headingMatch = line.match(headingLineRegex);
      const listMatch = line.match(listItemRegex);

      if (headingMatch) {
        flushParagraph();
        flushList();
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const processedText = convertBoldMarkdown(text);
        const id = `heading-${lineIndex}-${slugify(text)}`;
        const sanitized = DOMPurify.sanitize(processedText, { ALLOWED_TAGS: ['strong'], ALLOWED_ATTR: ['class'] });

        if (level <= 2) {
          elements.push(
            <h2 key={key++} id={id} className="font-jakarta font-bold text-[#010D3E] text-2xl md:text-3xl mb-6 mt-16 scroll-mt-24 border-l-4 border-[#0043F1] pl-4"
              dangerouslySetInnerHTML={{ __html: sanitized }} />
          );
        } else {
          elements.push(
            <h3 key={key++} id={id} className="font-jakarta font-semibold text-[#010D3E] text-xl md:text-2xl mb-5 mt-14 scroll-mt-24 border-l-3 border-[#0043F1]/60 pl-3"
              dangerouslySetInnerHTML={{ __html: sanitized }} />
          );
        }
      } else if (listMatch) {
        flushParagraph();
        listItems.push(listMatch[1].trim());
      } else if (line.trim() === "") {
        if (listItems.length === 0) paraLines.push(line);
      } else {
        if (listItems.length > 0) flushList();
        paraLines.push(line);
      }
    });

    flushParagraph();
    flushList();
    return elements;
  };

  return (
    <article className="prose prose-lg max-w-none">
      {renderContent(content)}
    </article>
  );
};

export default ArticleContent;
