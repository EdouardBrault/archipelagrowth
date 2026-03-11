
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import BoostProductivity from "@/components/BoostProductivity";
import GeoPillars from "@/components/GeoPillars";
import NotreEquipe from "@/components/NotreEquipe";
import NosChiffres from "@/components/NosChiffres";
import StructuredData from "@/components/StructuredData";
import SEOHelmet from "@/components/SEOHelmet";

const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const TestimonialBubbles = lazy(() => import("@/components/TestimonialBubbles"));
const Partenariats = lazy(() => import("@/components/Partenariats"));
const Methodologie = lazy(() => import("@/components/Methodologie"));
const TestezVousGeo = lazy(() => import("@/components/TestezVousGeo"));
const PaidSection = lazy(() => import("@/components/PaidSection"));
const TestezVousPaid = lazy(() => import("@/components/TestezVousPaid"));
const LatestArticles = lazy(() => import("@/components/LatestArticles"));
const HomeFaq = lazy(() => import("@/components/HomeFaq"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const location = useLocation();
  const canonicalUrl = "https://archipelagrowth.com/";

  return (
    <>
      <SEOHelmet
        title="AI Optimization & GEO - #1 Agency in the US | ArchipelaGrowth"
        description="Agency specialized in Generative Engine Optimization (GEO) and AI visibility. Become the reference in your industry on ChatGPT, Perplexity, and Claude."
        canonicalUrl={canonicalUrl}
      />
      <StructuredData type="organization" />
      <Layout>
        <Hero />
        <LogoCarousel />
        <BoostProductivity />
        <GeoPillars />
        <NotreEquipe />
        <NosChiffres />
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <TestimonialBubbles />
          <Partenariats />
          <Methodologie />
          <TestezVousGeo />
          <PaidSection />
          <TestezVousPaid />
          <LatestArticles />
          <HomeFaq />
          <ContactSection />
        </Suspense>
      </Layout>
    </>
  );
};

export default Index;
