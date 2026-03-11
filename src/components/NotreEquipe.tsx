
import { useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const team = [
  { name: "Edward Brault", role: "Co-Founder", photo: "/lovable-uploads/photo-edouard-v2.png" },
  { name: "Michaël Abramczuk", role: "Co-Founder", photo: "/lovable-uploads/photo-michael-v2.png" },
  { name: "Richard", role: "GEO & Paid Consultant", photo: "/lovable-uploads/photo-germain-v2.png" },
  { name: "Nathan", role: "GEO & Paid Consultant", photo: "/lovable-uploads/photo-nathan-v2.png" },
  { name: "Nour", role: "GEO & Paid Consultant", photo: "/lovable-uploads/photo-nour-v2.png" },
  { name: "Rachel", role: "GEO & Paid Consultant", photo: "/lovable-uploads/photo-pauline-v2.png" },
  { name: "Eva", role: "GEO & Paid Consultant", photo: "/lovable-uploads/photo-eva-v2.png" },
  { name: "Leah", role: "Business Developer", photo: "/lovable-uploads/photo-lea-v2.png" },
  { name: "Ashley", role: "Lead Designer", photo: "/lovable-uploads/photo-hortense-v2.png" },
];

const NotreEquipe = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isResettingRef = useRef(false);

  const tripleTeam = [...team, ...team, ...team];

  const getOneSetWidth = useCallback(() => {
    if (!scrollRef.current) return 0;
    return scrollRef.current.scrollWidth / 3;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const oneSet = el.scrollWidth / 3;
      el.scrollLeft = oneSet;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isResettingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const oneSet = el.scrollWidth / 3;
    if (el.scrollLeft >= oneSet * 2) {
      isResettingRef.current = true;
      el.style.scrollBehavior = 'auto';
      el.scrollLeft -= oneSet;
      el.style.scrollBehavior = '';
      isResettingRef.current = false;
    } else if (el.scrollLeft <= 0) {
      isResettingRef.current = true;
      el.style.scrollBehavior = 'auto';
      el.scrollLeft += oneSet;
      el.style.scrollBehavior = '';
      isResettingRef.current = false;
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoScroll();

    const el = scrollRef.current;
    const pause = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
    const resume = () => {
      pause();
      startAutoScroll();
    };

    el?.addEventListener("mouseenter", pause);
    el?.addEventListener("mouseleave", resume);
    el?.addEventListener("touchstart", pause);
    el?.addEventListener("touchend", resume);
    el?.addEventListener("scroll", handleScroll);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      el?.removeEventListener("mouseenter", pause);
      el?.removeEventListener("mouseleave", resume);
      el?.removeEventListener("touchstart", pause);
      el?.removeEventListener("touchend", resume);
      el?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Meet the Team
          </span>
        </div>

        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            Our Team
          </span>
        </h2>

        <p className="text-lg text-[#010D3E] mb-8 max-w-2xl mx-auto leading-relaxed font-inter">
          ArchipelaGrowth is a dynamic agency built by talented, agile, and attentive professionals.
        </p>

        <div className="flex justify-center mb-14">
          <Button
            asChild
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 py-3 text-base rounded-lg font-inter"
          >
            <Link to="/contact#contact-form">Contact Us</Link>
          </Button>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute bottom-0 h-48 z-0 rounded-none"
            style={{
              background: 'linear-gradient(90deg, #CAF0F8 0%, #80FFE8 25%, #CAF0F8 50%, #0043F1 85%, #061A40 100%)',
              left: 'calc(-50vw + 50%)',
              right: 'calc(-50vw + 50%)',
            }}
          />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory relative z-10 pb-20 md:pb-24 px-[calc((100%-280px)/2)] md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tripleTeam.map((member, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] md:w-[300px] snap-start">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-6 text-center">
                  <div className="flex justify-center mb-4 overflow-hidden rounded-full">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full aspect-square object-cover scale-110 object-[center_-5%]"
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-[#f0f0f0]" />
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="font-jakarta font-bold text-[#010D3E] text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500 font-inter">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex absolute bottom-4 z-20 justify-center gap-8 left-0 right-0">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full text-[#0043F0] hover:border-2 hover:border-[#0043F0] flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border-2 border-[#0043F0] text-[#0043F0] hover:bg-[#0043F0] hover:text-white flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div
            className="md:hidden absolute bottom-0 h-40 z-0 rounded-none"
            style={{
              background: 'linear-gradient(90deg, #CAF0F8 0%, #80FFE8 50%, #0043F1 100%)',
              left: 'calc(-50vw + 50%)',
              right: 'calc(-50vw + 50%)',
            }}
          />

          <div className="flex md:hidden absolute bottom-2 left-0 right-0 z-20 justify-center gap-8">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full text-[#0043F0] flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border-2 border-[#0043F0] text-[#0043F0] hover:bg-[#0043F0] hover:text-white flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotreEquipe;
