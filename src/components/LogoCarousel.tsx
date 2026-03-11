
const LogoCarousel = () => {
  const logos = [
    { src: "/lovable-uploads/logo-sodexo-blue.png", alt: "Sodexo" },
    { src: "/lovable-uploads/logo-ca-assure-blue.png", alt: "Ça assure" },
    { src: "/lovable-uploads/logo-keyrus-blue.png", alt: "Keyrus" },
    { src: "/lovable-uploads/logo-pivot-blue.png", alt: "Pivot" },
    { src: "/lovable-uploads/logo-modeo-blue.png", alt: "Modeo" },
    { src: "/lovable-uploads/logo-dahlia-blue.png", alt: "Dahlia" },
    { src: "/lovable-uploads/logo-everwin-blue.png", alt: "Everwin" },
    { src: "/lovable-uploads/logo-mirakl-blue.png", alt: "Mirakl" },
    { src: "/lovable-uploads/logo-hyperline-blue.png", alt: "Hyperline" },
    { src: "/lovable-uploads/logo-playplay-blue.png", alt: "PlayPlay" },
    { src: "/lovable-uploads/logo-spacefill-blue.png", alt: "Spacefill" },
    { src: "/lovable-uploads/logo-factorial-blue.png", alt: "Factorial" },
    { src: "/lovable-uploads/logo-softgarden-blue.png", alt: "Softgarden" },
    { src: "/lovable-uploads/logo-cenareo-blue.png", alt: "Cenareo" },
    { src: "/lovable-uploads/logo-billet-reduc-blue.png", alt: "Billet Réduc'" },
  ];

  // Mobile: Split into two rows
  const row1 = logos.slice(0, 7);
  const row2 = logos.slice(7);

  const ScrollingRow = ({ items, direction = "left" }: { items: typeof logos; direction?: "left" | "right" }) => (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className={`flex ${direction === "left" ? "animate-scroll" : "animate-scroll-reverse"}`}>
        {[...items, ...items].map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-5 flex items-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-4 pb-8 bg-white overflow-hidden">
      {/* Mobile: title + two-row scrolling carousel */}
      <div className="md:hidden">
        <p className="text-center text-sm text-gray-500 font-inter mb-4">
          Ils nous font confiance
        </p>
        <div className="flex flex-col gap-4">
          <ScrollingRow items={row1} direction="left" />
          <ScrollingRow items={row2} direction="right" />
        </div>
      </div>

      {/* Desktop: single-row scrolling carousel */}
      <div className="hidden md:block relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8 flex items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
