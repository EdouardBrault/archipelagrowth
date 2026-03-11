
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
  const canonicalUrl = location.pathname === "/" || location.pathname === "/agencegeo" || location.pathname === "/archipel-homepage" ? "https://archipelmarketing.com/" : undefined;

  return (
    <>
      <SEOHelmet
        title="AI Optimization & GEO - Agence #1 France | Archipel Marketing"
        description="Agence spécialisée en Generative Engine Optimization (GEO) et visibilité sur l'IA. Devenez la référence de votre secteur sur ChatGPT, Perplexity et Claude."
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
          {/* VideoTestimonials hidden until video is ready */}
          {/* <VideoTestimonials /> */}
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
