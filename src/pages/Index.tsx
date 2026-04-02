
import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import BoostProductivity from "@/components/BoostProductivity";
import GeoPillars from "@/components/GeoPillars";
import NotreEquipe from "@/components/NotreEquipe";
import NosChiffres from "@/components/NosChiffres";
import StructuredData from "@/components/StructuredData";
import SEOHelmet from "@/components/SEOHelmet";
import { useLanguage } from "@/i18n";

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
  const { t, language } = useLanguage();
  const canonicalUrl = language === "it" ? "https://archipelagrowth.com/it" : "https://archipelagrowth.com/";

  return (
    <>
      <SEOHelmet title={t.index.seoTitle} description={t.index.seoDescription} canonicalUrl={canonicalUrl} />
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
