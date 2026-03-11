
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = ["GEO", "Google Ads", "Clients", "Autre"];

const placeholderArticles = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Blog
          </span>
        </div>

        {/* Title */}
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            Nos derniers articles
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#010D3E] mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
          Envie d'en apprendre plus sur le GEO ? On partage nos découvertes dans la section blog : infographies, méthodes, résultats ... tout ce qu'il faut savoir pour progresser sur ce sujet !
        </p>

        {/* Category filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-inter border ${
                cat === "Google Ads"
                  ? "border-[#00C9A7] text-[#00C9A7]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles grid - placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {placeholderArticles.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-2xl overflow-hidden text-left">
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <div className="p-6">
                <h3 className="font-jakarta text-xl font-bold text-[#010D3E] mb-2">
                  Nom de l'article
                </h3>
                <p className="text-sm text-[#010D3E]/60 font-inter mb-4">
                  Description ou mot clé
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-inter border border-[#010D3E] text-[#010D3E]">
                    GEO
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-inter border border-[#00C9A7] text-[#00C9A7]">
                    Google Ads
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-inter border border-gray-300 text-gray-600">
                    Clients
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-inter border border-gray-300 text-gray-600">
                    Autre
                  </span>
                </div>
                <Link
                  to="/blog"
                  className="text-[#0043F1] font-inter font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Lire l'article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Button
          asChild
          className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter px-8 py-3 text-base rounded-lg"
        >
          <Link to="/blog">Voir notre blog</Link>
        </Button>
      </div>
    </section>
  );
};

export default BlogSection;
