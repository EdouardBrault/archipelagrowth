
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import featureScreenshot1 from "@/assets/feature-screenshot-1.png";
import featureScreenshot2 from "@/assets/feature-screenshot-2.png";
import featureScreenshot3 from "@/assets/feature-screenshot-3.png";

const defaultFeatures: FeatureItem[] = [
  {
    number: "1",
    title: "Feature",
    subtitle: "Want to know your visibility on the leading LLMs on the market?",
    description:
      "At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.",
  },
  {
    number: "2",
    title: "Feature",
    subtitle: "Want to know your visibility on the leading LLMs on the market?",
    description:
      "At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.",
  },
  {
    number: "3",
    title: "Feature",
    subtitle: "Want to know your visibility on the leading LLMs on the market?",
    description:
      "At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.",
  },
];

const images = [featureScreenshot1, featureScreenshot2, featureScreenshot3];

interface FeatureItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  anchorId?: string;
}

interface ServiceFeaturesProps {
  features?: FeatureItem[];
}

const ServiceFeatures = ({ features }: ServiceFeaturesProps) => {
  const items = features || defaultFeatures;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {items.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={feature.number}
                id={feature.anchorId}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}
              >
                {/* Text */}
                <div className="md:w-1/2">
                  <h3 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                      {feature.title}
                    </span>
                  </h3>
                  <p className="text-lg text-[#010D3E] font-inter font-medium mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-[#010D3E] font-inter leading-relaxed mb-6 text-sm">
                    {feature.description}
                  </p>
                  <Link
                    to="/contact#contact-form"
                    className="text-[#0043F1] font-inter font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Screenshot */}
                <div className="md:w-1/2 perspective-[1200px]">
                  <img
                    src={feature.image || images[index] || images[0]}
                    alt={`${feature.title} ${feature.number}`}
                    className="w-full rounded-2xl border border-gray-200 transition-all duration-500 ease-out hover:[transform:rotateY(-4deg)_rotateX(3deg)_scale(1.03)] cursor-pointer"
                    style={{
                      boxShadow: "0 20px 60px -15px rgba(0, 19, 84, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15)",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
