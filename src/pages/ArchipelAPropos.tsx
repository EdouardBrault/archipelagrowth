
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap, Timer, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import LogoCarousel from "@/components/LogoCarousel";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";

const timelineEvents = [
  { year: "2021", title: "The Beginning", description: "Edouard and Michaël, the 2 founders of ArchipelaGrowth, met in 2021 at a marketing agency.", detail: "It's the story of a great friendship that quickly turned into a shared desire to build something together.", extra: "", month: "January", label: "The Beginning", photo: "/lovable-uploads/timeline-rencontre.jpg", photoPosition: "object-[center_25%]" },
  { year: "2022", title: "Agency Founded", description: "In 2022, they decided to create ArchipelaGrowth, a digital marketing agency specialized in paid media. Clients quickly came thanks to their expertise and quality of service.", detail: "", extra: "", month: "June", label: "Agency Founded", photo: "/lovable-uploads/timeline-creation-agence.jpg", photoPosition: "object-[center_25%]" },
  { year: "2025", title: "First GEO Client", description: "In 2025, ArchipelaGrowth made a bet: invest most of its resources into understanding GEO, which they believe is the future of marketing. This vision led to signing their first GEO client.", detail: "", extra: "", month: "April", label: "First GEO Client", photo: "/lovable-uploads/timeline-1er-client-geo.jpeg", photoPosition: "object-[center_25%]" },
  { year: "2025", title: "Profound & Peec AI Partners", description: "As they served more clients, ArchipelaGrowth signed exclusive partnerships with the leading AI visibility tools. They became the first European agency to collaborate with Profound and one of the first with Peec AI.", detail: "", extra: "", month: "July", label: "Profound & Peec AI Partners", photo: "/lovable-uploads/timeline-profound.jpg", photoPosition: "object-[center_20%]" },
  { year: "2025", title: "First Office", description: "ArchipelaGrowth's growth led to a major milestone: for the first time, the agency moved into its own office space.", detail: "", extra: "", month: "September", label: "First Office", photo: "/lovable-uploads/timeline-locaux.jpg", photoPosition: "object-center" },
  { year: "2026", title: "100th Client Signed", description: "Approaching its 5th anniversary, ArchipelaGrowth celebrates signing its 100th client (40th in GEO). A milestone rewarding years of work, testing, dedication, and innovation.", detail: "", extra: "", month: "January", label: "100th Client Signed", photo: "/lovable-uploads/timeline-100e-client.jpg", photoPosition: "object-[center_35%]" },
  { year: "", title: "What's Next?", description: "ArchipelaGrowth aims to become the global reference in GEO. Ambitious? Certainly. Too ambitious? It would be a shame not to aim for the stars!", detail: "", extra: "", month: "", label: "What's Next?", photo: "/lovable-uploads/timeline-rooftop.jpg", photoPosition: "object-center" },
];

const teamMembers = [
  { name: "James Carter", role: "Co-Founder", id: 0, photo: "/lovable-uploads/photo-edouard-v2.png" },
  { name: "Ryan Mitchell", role: "Co-Founder", id: 1, photo: "/lovable-uploads/photo-michael-v2.png" },
  { name: "Aiden Ross", role: "GEO & Paid Consultant", id: 2, photo: "/lovable-uploads/photo-nour-v2.png" },
  { name: "Tyler Brooks", role: "GEO & Paid Consultant", id: 3, photo: "/lovable-uploads/photo-germain-v2.png" },
  { name: "Brandon Hayes", role: "GEO & Paid Consultant", id: 4, photo: "/lovable-uploads/photo-nathan-v2.png" },
  { name: "Megan Reed", role: "GEO & Paid Consultant", id: 5, photo: "/lovable-uploads/photo-eva-v2.png" },
  { name: "Lauren Scott", role: "GEO & Paid Consultant", id: 6, photo: "/lovable-uploads/photo-pauline-v2.png" },
  { name: "Ashley Morgan", role: "Business Developer", id: 7, photo: "/lovable-uploads/photo-lea-v2.png" },
  { name: "Chloe Bennett", role: "Lead Designer", id: 8, photo: "/lovable-uploads/photo-hortense-v2.png" },
];

const values = [
  { icon: Zap, title: "Performance", description: "Every action is designed to produce measurable impact: increased visibility, citations in generative engines, and sustainable competitive advantage." },
  { icon: Timer, title: "Pragmatism", description: "GEO evolves fast. So do we. We test, analyze, and optimize continuously. No unnecessary theory: only concrete strategies that work in real AI environments." },
  { icon: MoveRight, title: "Transparency", description: "Understanding your market before optimizing your visibility. We work transparently, with clear communication, to build a GEO strategy aligned with your business goals." },
];

const ArchipelAPropos = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    timelineEvents.forEach((event) => {
      if (event.photo) { const img = new Image(); img.src = event.photo; }
    });
  }, []);

  return (
    <>
      <SEOHelmet
        title="About Us | ArchipelaGrowth - #1 GEO Agency in the US"
        description="Discover the story, team, and values of ArchipelaGrowth, the leading GEO agency in the US."
        canonicalUrl="https://archipelagrowth.com/about"
      />
      <Layout>
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Welcome! 👋</span>
            </div>
            <h1 className="font-jakarta text-5xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">About ArchipelaGrowth</span>
            </h1>
            <p className="text-lg text-[#010D3E] font-inter mb-8">ArchipelaGrowth is the story of a pioneering GEO agency and consultants who rolled up their sleeves in 2024 to master how it works.</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter rounded-lg px-8">
                <Link to="/contact#contact-form">Contact Us</Link>
              </Button>
              <Link to="/contact#contact-form" className="text-[#0043F1] font-normal font-inter flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Your GEO Score <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-t-2xl p-6 md:p-12 relative overflow-hidden bg-cover bg-center min-h-[420px] md:min-h-[500px] md:h-[380px]" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-timeline.png')" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
                <div className="flex flex-col items-end order-first md:order-last">
                  <div className="flex items-center justify-between w-full mb-2">
                    {timelineEvents[activeTimeline].month && <span className="font-inter text-[#010D3E]/60 text-sm">{timelineEvents[activeTimeline].month}</span>}
                    {timelineEvents[activeTimeline].year && <span className="font-jakarta text-5xl md:text-8xl font-bold text-[#010D3E]/20">{timelineEvents[activeTimeline].year}</span>}
                  </div>
                  <div className="w-full rounded-xl overflow-hidden relative h-44 md:h-60">
                    {timelineEvents.map((event, index) => event.photo && (
                      <img key={index} src={event.photo} alt={event.title} className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 ${event.photoPosition || ''} ${index === activeTimeline ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                  </div>
                </div>
                <div className="order-last md:order-first">
                  <h3 className="font-jakarta text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-[#010D3E]">{timelineEvents[activeTimeline].title}</h3>
                  <p className="font-inter text-[#010D3E]/80 text-sm md:text-base mb-3">{timelineEvents[activeTimeline].description}</p>
                  <Button onClick={() => { if (activeTimeline < timelineEvents.length - 1) setActiveTimeline(activeTimeline + 1); }} className="hidden md:inline-flex bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-full px-6">
                    Next milestone <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:hidden bg-[#0043F1] px-4 py-5">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => setActiveTimeline(Math.max(0, activeTimeline - 1))} disabled={activeTimeline === 0} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 transition-opacity"><ArrowLeft className="w-5 h-5 text-white" /></button>
                <span className="font-jakarta text-white font-bold text-sm text-center px-2">{timelineEvents[activeTimeline].label}</span>
                <button onClick={() => setActiveTimeline(Math.min(timelineEvents.length - 1, activeTimeline + 1))} disabled={activeTimeline === timelineEvents.length - 1} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 transition-opacity"><ArrowRight className="w-5 h-5 text-white" /></button>
              </div>
              <div className="flex justify-center gap-2">
                {timelineEvents.map((_, index) => (<button key={index} onClick={() => setActiveTimeline(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeTimeline ? 'bg-white scale-125' : 'bg-white/40'}`} />))}
              </div>
            </div>

            <div className="hidden md:block bg-[#0043F1] rounded-b-2xl px-8 md:px-12 py-8 relative">
              <div className="flex items-center relative z-10">
                <span className="font-jakarta text-white font-bold text-2xl md:text-4xl italic shrink-0 mr-4 md:mr-6">2021</span>
                <div className="flex-1 relative h-[120px]">
                  <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/40 -translate-y-1/2" />
                  <div className="flex justify-between h-full relative z-10">
                    {timelineEvents.map((event, index) => {
                      const isAbove = index % 2 !== 0;
                      return (
                        <button key={index} onClick={() => setActiveTimeline(index)} className="relative flex flex-col items-center justify-center group">
                          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white transition-all ${index === activeTimeline ? "bg-white scale-125" : "bg-white/40"}`} />
                          <span className={`absolute whitespace-normal font-jakarta text-xs text-white text-center max-w-[120px] leading-snug ${isAbove ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"} ${index === activeTimeline ? "font-bold" : "font-semibold opacity-80"}`}>
                            <sup className="text-[6px] mr-0.5">({index + 1})</sup>{event.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <span className="font-jakarta text-white font-bold text-2xl md:text-4xl italic shrink-0 ml-4 md:ml-6">2026</span>
              </div>
            </div>
            <div className="md:hidden bg-[#0043F1] rounded-b-2xl h-3" />
          </div>
        </section>

        <section id="our-team" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6"><span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Meet the Team</span></div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 leading-tight"><span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">Our Team</span></h2>
            <p className="text-[#010D3E] font-inter mb-8 max-w-xl mx-auto">ArchipelaGrowth is a dynamic agency built by talented, agile, and attentive professionals.</p>
            <div className="flex justify-center mb-12">
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-lg px-8"><Link to="/contact#contact-form">Contact Us</Link></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="flex justify-center mb-4 w-48 h-48 rounded-full overflow-hidden mx-auto">
                    {member.photo ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover scale-110 object-[center_-5%]" loading="lazy" /> : <div className="w-full h-full bg-gray-100" />}
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg">{member.name}</h3>
                  <p className="font-inter text-[#010D3E]/60 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6"><span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">About Us</span></div>
            <h2 className="font-jakarta text-4xl md:text-6xl font-bold mb-6 leading-tight"><span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">Our Values</span></h2>
            <p className="text-[#010D3E]/70 font-inter mb-16 max-w-xl mx-auto leading-relaxed">
              GEO is redefining the rules of online visibility.<br />At ArchipelaGrowth, our values guide every decision, recommendation, and action.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
              {values.map((v, index) => (
                <div key={v.title} className="text-center group hover:-translate-y-2 transition-all duration-500 ease-out" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#0043F1]/5 flex items-center justify-center group-hover:bg-[#0043F1]/10 group-hover:scale-110 transition-all duration-500">
                      <v.icon className="w-7 h-7 text-[#0043F1] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">{v.title}</h3>
                  <p className="font-inter text-[#010D3E]/60 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
            <Link to="/contact#contact-form" className="text-[#0043F1] font-inter font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Let's talk? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <ContactSection />
      </Layout>
    </>
  );
};

export default ArchipelAPropos;
