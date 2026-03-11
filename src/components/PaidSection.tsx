import { useEffect, useState, useRef } from "react";

const orbitLogos = [
  { src: "/lovable-uploads/paid-orbit-1.png", alt: "Lovable" },
  { src: "/lovable-uploads/paid-orbit-2.png", alt: "Pinterest ads" },
  { src: "/lovable-uploads/paid-orbit-3.png", alt: "Bing ads" },
  { src: "/lovable-uploads/paid-orbit-4.png", alt: "Reddit" },
  { src: "/lovable-uploads/paid-orbit-5.png", alt: "HubSpot" },
  { src: "/lovable-uploads/paid-orbit-6.png", alt: "SnapChat" },
  { src: "/lovable-uploads/paid-orbit-7.png", alt: "Google Ads" },
  { src: "/lovable-uploads/paid-orbit-8.png", alt: "YouTube" },
];

const PaidSection = () => {
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(8).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          orbitLogos.forEach((_, i) => {
            setTimeout(() => {
              setVisibleLogos((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 200);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const desktopPositions = [
    { x: 220, y: -120 },
    { x: -220, y: -120 },
    { x: 300, y: 0 },
    { x: 100, y: -170 },
    { x: -300, y: 0 },
    { x: -100, y: -170 },
    { x: -200, y: 120 },
    { x: 200, y: 120 },
  ];

  const mobilePositions = desktopPositions.map(p => ({
    x: p.x * 0.45,
    y: p.y * 0.45,
  }));

  return (
    <section className="py-20 bg-white">
      <style>{`
        .paid-orbit-logo {
          filter: brightness(0) invert(1);
          transition: filter 0.4s ease, transform 0.3s ease;
        }
        .paid-orbit-logo:hover {
          filter: brightness(0) saturate(100%) invert(18%) sepia(90%) saturate(5000%) hue-rotate(225deg) brightness(100%) contrast(105%);
          transform: scale(1.15);
        }
        @keyframes floatOrbit {
          0%, 100% { transform: translate(var(--tx), var(--ty)); }
          25% { transform: translate(calc(var(--tx) + 6px), calc(var(--ty) - 8px)); }
          50% { transform: translate(calc(var(--tx) - 4px), calc(var(--ty) + 6px)); }
          75% { transform: translate(calc(var(--tx) + 5px), calc(var(--ty) + 4px)); }
        }
        .orbit-item {
          animation: floatOrbit 6s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            About Us
          </span>
        </div>

        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            At ArchipelaGrowth, we also do paid media
          </span>
        </h2>

        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
          GEO is powerful, but it's not the only lever for generating leads or conversions. That's why our consultants also specialize in the following channels.
        </p>

        <div
          ref={sectionRef}
          className="rounded-3xl max-w-4xl mx-auto relative overflow-visible"
          style={{
            backgroundImage: "url('/lovable-uploads/mesh-gradient-paid.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16 / 9",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img src="/lovable-uploads/paid-logo-meta-dark.png" alt="Meta Ads" className="h-10 md:h-24 w-auto object-contain" loading="lazy" />
          </div>

          {orbitLogos.map((logo, i) => {
            const x = desktopPositions[i].x;
            const y = desktopPositions[i].y;
            const mx = mobilePositions[i].x;
            const my = mobilePositions[i].y;

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 orbit-item"
                style={{
                  "--tx": `${x}px`,
                  "--ty": `${y}px`,
                  "--mx": `${mx}px`,
                  "--my": `${my}px`,
                  transform: `translate(var(--tx), var(--ty))`,
                  marginLeft: "-20px",
                  marginTop: "-20px",
                  opacity: visibleLogos[i] ? 1 : 0,
                  transition: `opacity 0.6s ease ${i * 0.1}s`,
                  animationDelay: `${i * 0.75}s`,
                  zIndex: 5,
                } as React.CSSProperties}
              >
                <img src={logo.src} alt={logo.alt} className="paid-orbit-logo h-10 md:h-32 w-auto object-contain cursor-pointer" loading="lazy" />
              </div>
            );
          })}

          <style>{`
            @media (max-width: 767px) {
              .orbit-item {
                animation: none !important;
                transform: translate(var(--mx), var(--my)) !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default PaidSection;
