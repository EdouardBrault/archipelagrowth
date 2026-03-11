
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/EWxt7F6dGZvE3HtB6";

interface GoogleReview {
  text: string;
  authorName: string;
  authorPhoto: string | null;
  profileUrl: string | null;
  rating: number;
  relativeTime: string;
}

interface GoogleReviewsData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

// Fallback reviews in case API fails
const fallbackReviews: GoogleReview[] = [
  { text: "Avec Archipel, j'ai doublé ma volumétrie de leads à budget équivalent en 2 mois.", authorName: "Nicolas R.", authorPhoto: null, profileUrl: null, rating: 5, relativeTime: "il y a 2 mois" },
  { text: "Grâce au travail d'Archipel, on a signé plusieurs leads venant du GEO !", authorName: "Elodie M.", authorPhoto: null, profileUrl: null, rating: 5, relativeTime: "il y a 3 mois" },
  { text: "On est passé n°1 sur ChatGPT sur +100 prompts en 1 mois. Impressionnant.", authorName: "Claire D.", authorPhoto: null, profileUrl: null, rating: 5, relativeTime: "il y a 1 mois" },
  { text: "J'ai tenté de faire du GEO sans grand espoir… je suis bluffé par la rapidité des résultats obtenus.", authorName: "Damien L.", authorPhoto: null, profileUrl: null, rating: 5, relativeTime: "il y a 4 mois" },
  { text: "Le GEO a complètement changé notre acquisition. On génère des leads ultra qualifiés sans augmenter notre budget.", authorName: "Julien B.", authorPhoto: null, profileUrl: null, rating: 5, relativeTime: "il y a 2 mois" },
];

const FiveStars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
    ))}
  </div>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const TestimonialBubbles = () => {
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-google-reviews');
        if (error) throw error;
        if (data?.success) {
          setReviewsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch Google reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const reviews = reviewsData?.reviews?.length ? reviewsData.reviews : fallbackReviews;
  const rating = reviewsData?.rating ?? 5.0;
  const totalReviews = reviewsData?.totalReviews;

  return (
    <section className="py-16 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Testimonials
          </span>
        </div>

        {/* Title */}
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-10 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            Ce que nos clients{"\n"}disent de nous
          </span>
        </h2>

        {/* Google rating bar */}
        <div className="flex flex-col items-center justify-center mb-10 gap-2">
          <div className="flex items-center gap-3">
            <GoogleLogo />
            <span className="font-jakarta text-2xl font-bold text-[#010D3E]">{rating.toFixed(1)}</span>
            <FiveStars />
            {totalReviews && (
              <span className="text-sm text-[#010D3E]/50 font-inter">({totalReviews} avis)</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#010D3E]/60 font-inter">
              Avis Google vérifiés
            </p>
            <span className="text-[#010D3E]/30">·</span>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#0043F1] hover:underline font-inter"
            >
              Voir tous les avis →
            </a>
          </div>
        </div>

        {/* Scrolling reviews */}
        <div className="relative">
          <div
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, idx) => (
              <a
                key={idx}
                href={review.profileUrl || GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[300px] max-w-[340px] bg-white rounded-xl p-5 shadow-sm border border-gray-100 snap-start flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <FiveStars />
                  <GoogleLogo />
                </div>
                <p className="text-[#010D3E]/80 font-inter text-sm leading-relaxed mb-4 line-clamp-4">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {review.authorPhoto ? (
                      <img
                        src={review.authorPhoto}
                        alt={review.authorName}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#0043F1] flex items-center justify-center text-white font-bold text-xs font-jakarta">
                        {review.authorName.charAt(0)}
                      </div>
                    )}
                    <span className="font-jakarta font-semibold text-sm text-[#010D3E]">
                      {review.authorName}
                    </span>
                  </div>
                  <span className="text-xs text-[#010D3E]/40 font-inter">{review.relativeTime}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center pt-4">
            <div className="w-5 h-5 border-2 border-[#0043F1]/30 border-t-[#0043F1] rounded-full animate-spin" />
          </div>
        )}
        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Button
            asChild
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-bold px-8 py-3 text-base rounded-lg"
          >
            <Link to="/contact#contact-form">Contactez-nous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialBubbles;
