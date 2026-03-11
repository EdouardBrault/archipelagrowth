
import { useState, useEffect, useCallback, useRef } from "react";
import { List, ChevronUp } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/**
 * Modern floating Table of Contents that tracks scroll position.
 * Works with both Markdown (legacy) and HTML (TipTap) article content.
 */
const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const tocRef = useRef<HTMLDivElement>(null);

  // Parse headings from content (markdown or HTML)
  useEffect(() => {
    // Small delay to let ArticleContent render and inject IDs
    const timer = setTimeout(() => {
      const articleEl = document.querySelector("article");
      if (!articleEl) return;

      const headings = articleEl.querySelectorAll("h2[id], h3[id]");
      const items: TocItem[] = [];

      headings.forEach((heading) => {
        const level = heading.tagName === "H2" ? 2 : 3;
        const text = (heading.textContent || "").trim();
        const id = heading.id;
        if (text && id) {
          items.push({ id, text, level });
        }
      });

      // Fallback: parse markdown if no DOM headings found
      if (items.length === 0) {
        const normalizedContent = content
          .replace(/\r\n/g, "\n")
          .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ")
          .replace(/[\u200B\u200C\u200D\uFEFF]/g, "")
          .replace(/\n{3,}/g, "\n\n");

        const headingLineRegex =
          /^[\t ]*?(#{1,6})[\t ]*?(.*?)[\t ]*?#*\s*$/;

        normalizedContent.split("\n").forEach((line, lineIndex) => {
          const m = line.match(headingLineRegex);
          if (m) {
            const level = m[1].length;
            if (level === 2 || level === 3) {
              const rawText = m[2].trim().replace(/\*\*(.*?)\*\*/g, "$1");
              const id = `heading-${lineIndex}-${slugify(rawText)}`;
              items.push({ id, text: rawText, level });
            }
          }
        });
      }

      setTocItems(items);
    }, 300);

    return () => clearTimeout(timer);
  }, [content]);

  // Intersection observer for active heading
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0.1 }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Show immediately once TOC items are parsed
  useEffect(() => {
    if (tocItems.length > 0) {
      setIsVisible(true);
    }
  }, [tocItems]);

  // Scroll progress + hide at bottom
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgressPercent(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));

    // Hide only when past the article content
    const articleEl = document.querySelector("article");
    if (!articleEl) return;

    const articleRect = articleEl.getBoundingClientRect();
    const articleBottom = scrollTop + articleRect.bottom - 400;

    if (tocItems.length > 0 && scrollTop >= articleBottom) {
      setIsVisible(false);
    } else if (tocItems.length > 0) {
      setIsVisible(true);
    }
  }, [tocItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const t = setTimeout(handleScroll, 200);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, [handleScroll]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Find active index for the progress line
  const activeIndex = tocItems.findIndex((i) => i.id === activeId);

  if (tocItems.length === 0) return null;

  return (
    <div
      ref={tocRef}
      className={`
        fixed top-24 left-6 z-50
        w-56 transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"}
        hidden xl:block
      `}
    >
      <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Top progress bar */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-[#0043F1] to-[#0043F1]/60 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="w-3.5 h-3.5 text-[#0043F1]" />
            <span className="text-xs font-jakarta font-bold text-[#010D3E] uppercase tracking-wider">
              Sommaire
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? "Ouvrir le sommaire" : "Fermer le sommaire"}
          >
            <ChevronUp
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`transition-all duration-400 ease-out overflow-hidden ${
            isCollapsed ? "max-h-0 opacity-0" : "max-h-[60vh] opacity-100"
          }`}
        >
          <nav className="px-3 pb-4 relative">
            {/* Vertical track line */}
            <div className="absolute left-[18px] top-0 bottom-4 w-px bg-gray-200" />

            {/* Active progress line */}
            {activeIndex >= 0 && (
              <div
                className="absolute left-[18px] top-0 w-px bg-[#0043F1] transition-all duration-300 ease-out"
                style={{
                  height: `${((activeIndex + 1) / tocItems.length) * 100}%`,
                  maxHeight: "calc(100% - 1rem)",
                }}
              />
            )}

            <ul className="space-y-0.5 relative">
              {tocItems.map((item, index) => {
                const isActive = activeId === item.id;
                const isPast = activeIndex >= 0 && index <= activeIndex;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToHeading(item.id)}
                      className={`
                        group flex items-start gap-2.5 w-full text-left py-1.5 rounded-lg transition-all duration-200
                        ${item.level === 3 ? "pl-5" : "pl-1"}
                      `}
                    >
                      {/* Dot indicator */}
                      <span
                        className={`
                          mt-[7px] shrink-0 rounded-full transition-all duration-300
                          ${isActive
                            ? "w-2 h-2 bg-[#0043F1] shadow-[0_0_6px_rgba(0,67,241,0.4)]"
                            : isPast
                            ? "w-1.5 h-1.5 bg-[#0043F1]/50"
                            : "w-1.5 h-1.5 bg-gray-300 group-hover:bg-gray-400"
                          }
                        `}
                      />

                      {/* Label */}
                      <span
                        className={`
                          text-[13px] leading-snug transition-all duration-200 line-clamp-2
                          ${isActive
                            ? "text-[#0043F1] font-semibold"
                            : isPast
                            ? "text-[#010D3E]/70 font-medium"
                            : "text-gray-400 group-hover:text-gray-600 font-normal"
                          }
                          ${item.level === 3 ? "text-[12px]" : ""}
                        `}
                      >
                        {item.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
