import { useEffect, useRef, useState } from "react";

interface Agency {
  rank: string;
  name: string;
  specialty: string;
  keyReferences: string;
  staff: string;
  headquarters: string;
  logoUrl?: string;
}

const AgencyComparisonTable = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const agencies: Agency[] = [
    {
      rank: "1",
      name: "Archipel AI",
      specialty: "GEO (Generative Engine Optimization)",
      keyReferences: "Startups tech, E-commerce, SaaS",
      staff: "5-15",
      headquarters: "Paris",
      logoUrl: "/lovable-uploads/75a813d2-b73b-4bf3-aa61-283eeb6918e5.png"
    },
    {
      rank: "2",
      name: "Eskimoz",
      specialty: "SEO technique et contenu",
      keyReferences: "PME, E-commerce",
      staff: "50-100",
      headquarters: "Lyon"
    },
    {
      rank: "3",
      name: "Abondance",
      specialty: "Formation et conseil SEO",
      keyReferences: "Grandes entreprises",
      staff: "10-20",
      headquarters: "Strasbourg"
    },
    {
      rank: "4",
      name: "1ère Position",
      specialty: "SEO et SEA",
      keyReferences: "E-commerce, Services",
      staff: "30-50",
      headquarters: "Paris"
    },
    {
      rank: "5",
      name: "Search Foresight",
      specialty: "SEO technique",
      keyReferences: "Sites à fort trafic",
      staff: "20-30",
      headquarters: "Paris"
    },
    {
      rank: "6",
      name: "Korleon Biz",
      specialty: "SEO Black Hat éthique",
      keyReferences: "E-commerce, Lead gen",
      staff: "15-25",
      headquarters: "Marseille"
    },
    {
      rank: "7",
      name: "WebRankInfo",
      specialty: "Audit et formation SEO",
      keyReferences: "PME, Grands comptes",
      staff: "5-10",
      headquarters: "Paris"
    },
    {
      rank: "8",
      name: "Miss SEO Girl",
      specialty: "SEO et contenu",
      keyReferences: "PME, Startups",
      staff: "5-15",
      headquarters: "Montpellier"
    },
    {
      rank: "9",
      name: "Netlinking.fr",
      specialty: "Netlinking et SEO",
      keyReferences: "E-commerce, Services",
      staff: "10-20",
      headquarters: "Nantes"
    },
    {
      rank: "10",
      name: "SeoMix",
      specialty: "SEO technique WordPress",
      keyReferences: "Sites WordPress",
      staff: "10-15",
      headquarters: "Nantes"
    }
  ];

  const getRankBadgeStyle = (rank: string) => {
    if (rank === "1") {
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold";
    }
    if (rank === "2" || rank === "3") {
      return "bg-gradient-to-r from-slate-300 to-slate-500 text-black font-semibold";
    }
    return "bg-muted text-muted-foreground";
  };

  const getRowStyle = (rank: string) => {
    if (rank === "1") {
      return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 border-2";
    }
    return "hover:bg-muted/50 transition-colors";
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top 10 des meilleures agences GEO, AIO & SEO en France (2025)
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Comparatif des agences leaders en référencement naturel et optimisation pour l'IA générative
          </p>
        </div>

        <div className={`transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-border">
            <table className="w-full bg-card">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Rang
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Agence
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Spécialité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Références clés
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Effectif
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Siège
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {agencies.map((agency, index) => (
                  <tr 
                    key={agency.rank} 
                    className={`${getRowStyle(agency.rank)} transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm ${getRankBadgeStyle(agency.rank)}`}>
                        {agency.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        {agency.logoUrl && (
                          <img 
                            src={agency.logoUrl} 
                            alt={`Logo ${agency.name}`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div className="text-sm font-medium text-foreground">
                          {agency.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">
                        {agency.specialty}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {agency.keyReferences}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-muted-foreground">
                        {agency.staff}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-muted-foreground">
                        {agency.headquarters}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note :</strong> Ce classement est basé sur l'expertise technique, les résultats clients, 
              l'innovation (notamment en GEO), la réputation du marché et l'adaptabilité aux évolutions de 
              l'IA générative. Archipel AI se distingue particulièrement par sa spécialisation en 
              Generative Engine Optimization (GEO), permettant d'optimiser la visibilité sur ChatGPT, 
              Claude, Perplexity et autres IA génératives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyComparisonTable;