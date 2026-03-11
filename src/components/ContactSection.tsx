
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Shield, Eye, Loader2, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleReveal = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRevealed(true);
    setIsVerifying(false);
  };

  return (
    <section className="py-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 text-[#010D3E]">
          Contactez-nous
        </h2>
        <p className="text-[#010D3E]/60 font-inter mb-8 max-w-xl mx-auto">
          Pour toute demande liée au GEO, à la presse ou au recrutement, contactez-nous ici.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Button
            asChild
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter px-8 py-3 rounded-lg"
          >
            <Link to="/contact#contact-form">Nous contacter</Link>
          </Button>
          <a
            href="https://www.linkedin.com/company/archipel-marketing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-[#0043F1] font-medium hover:text-[#0043F1]/80 transition-colors flex items-center gap-1"
          >
            Nous suivre sur les réseaux <span>→</span>
          </a>
        </div>




        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10500!2d2.3387073!3d48.8713631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4026591f72b5e32d%3A0x399a4ead301c233a!2sArchipel%20Marketing%20-%20Agence%20GEO!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Archipel Marketing - 106 Rue de Richelieu, 75009 Paris"
            />
            <div className="p-4 bg-white">
              <p className="font-inter text-sm text-[#010D3E] font-medium">106 Rue de Richelieu, 75009 Paris</p>
            </div>
          </div>

          {/* Email */}
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div className="flex justify-center mb-3">
              <Mail className="w-5 h-5 text-[#0043F1]" />
            </div>
            <h3 className="font-jakarta font-semibold text-[#0043F1] mb-4">Nous écrire</h3>
            {isRevealed ? (
              <>
                <div className="inline-flex items-center gap-2 text-[#0043F1] text-sm font-inter mb-3">
                  <CheckCircle className="w-4 h-4" />
                  Contact vérifié
                </div>
                <a href="mailto:michael@archipelmarketing.com" className="block font-inter text-sm text-[#010D3E] underline hover:text-[#0043F1] transition-colors">
                  michael@archipelmarketing.com
                </a>
                <p className="mt-2">
                  <Link to="/contact#contact-form" className="font-inter text-sm text-[#010D3E] font-medium hover:text-[#0043F1] transition-colors">
                    Remplir le formulaire →
                  </Link>
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="font-inter text-sm text-gray-400">••••••@archipelmarketing.com</p>
                <div className="inline-flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-inter">Protection anti-spam</span>
                  </div>
                  <Button
                    onClick={handleReveal}
                    disabled={isVerifying}
                    className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-full px-5 text-sm"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Afficher le contact
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
