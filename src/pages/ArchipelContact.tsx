
import Layout from "@/components/Layout";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LogoCarousel from "@/components/LogoCarousel";
import ContactSection from "@/components/ContactSection";
import ContactFormSection from "@/components/ContactFormSection";

const ArchipelContact = () => {
  return (
    <>
      <SEOHelmet
        title="Contact | ArchipelaGrowth - #1 GEO Agency in the US"
        description="Contact ArchipelaGrowth for a GEO audit, partnership inquiry, or any other question."
        canonicalUrl="https://archipelagrowth.com/contact"
      />
      <Layout>
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Welcome! 👋</span>
            </div>
            <h1 className="font-jakarta text-5xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">Contact Us</span>
            </h1>
            <p className="text-lg text-[#010D3E] font-inter mb-8">Let's start your GEO audit</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter rounded-lg px-8">
                <a href="#contact-form">Contact Us</a>
              </Button>
              <a href="#contact-form" className="text-[#0043F1] font-normal font-inter flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Your GEO Score <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
        <LogoCarousel />
        <ContactFormSection />
        <ContactSection />
      </Layout>
    </>
  );
};

export default ArchipelContact;
