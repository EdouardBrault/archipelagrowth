
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AuditCtaConfig {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
}

interface ServiceAuditCtaProps {
  config?: AuditCtaConfig;
}

const ServiceAuditCta = ({ config }: ServiceAuditCtaProps) => {
  const badge = config?.badge || "Test Yourself";
  const title = config?.title || "Want to know your GEO Audit score?";
  const subtitle = config?.subtitle || "Want to know your visibility score on ChatGPT?";
  const description = config?.description || "At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.";
  const ctaLabel = config?.ctaLabel || "Request a GEO Audit";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            {badge}
          </span>
        </div>

        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        <p className="text-[#010D3E] font-inter font-medium mb-3">
          {subtitle}
        </p>

        <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed mb-8 max-w-xl mx-auto">
          {description}
        </p>

        <Button
          asChild
          className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 text-base rounded-lg"
        >
          <Link to="/contact#contact-form">{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
};

export default ServiceAuditCta;
