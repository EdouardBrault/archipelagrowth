
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormWebhook } from "@/hooks/useFormWebhook";
import { useToast } from "@/hooks/use-toast";
import { useUtmTracking } from "@/hooks/useUtmTracking";

const demandes = ["Audit GEO", "Audit SEA", "Recrutement", "Partenariats", "Presse", "Autre demande"];

interface ContactFormSectionConfig {
  cardTitle?: React.ReactNode;
  formTitle?: string;
  formDescription?: string;
}

interface ContactFormSectionProps {
  config?: ContactFormSectionConfig;
}

const ContactFormSection = ({ config }: ContactFormSectionProps) => {
  const cardTitle = config?.cardTitle || <>Rejoignez<br />l'Archipel</>;
  const formTitle = config?.formTitle || "Contact";
  const formDescription = config?.formDescription || "Besoin d'un audit GEO ? Ou d'informations complémentaires au sujet d'Archipel ? Contactez-nous ici et nous vous répondrons dans les plus brefs délais !";

  const { sendFormData } = useFormWebhook();
  const { toast } = useToast();
  const { getUtmParams } = useUtmTracking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    email: "",
    entreprise: "",
    demande: "Audit GEO",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const utmParams = getUtmParams();
      console.log('📊 UTM params being sent:', utmParams);
      await sendFormData({
        form_name: "Contact",
        form_id: "contact-form",
        fields: {
          nom: formData.nom,
          prenom: formData.prenom,
          telephone: formData.tel,
          email: formData.email,
          entreprise: formData.entreprise,
          demande: formData.demande,
          message: formData.message,
        },
        url: window.location.href,
        utm_params: utmParams,
      });
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ nom: "", prenom: "", tel: "", email: "", entreprise: "", demande: "Audit GEO", message: "" });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left - Gradient card */}
          <div
            className="rounded-3xl bg-cover bg-center flex items-end p-10 min-h-[500px]"
            style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-score.png')" }}
          >
            <h2 className="font-jakarta text-5xl md:text-6xl font-bold text-white leading-[1.05]">
              {cardTitle}
            </h2>
          </div>

          {/* Right - Form */}
          <div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                {formTitle}
              </span>
            </h2>
            <p className="text-[#010D3E] font-inter mb-8">
              {formDescription}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Prénom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Jean"
                    value={formData.prenom}
                    onChange={(e) => handleChange("prenom", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Nom <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Dupont"
                    value={formData.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Tel. <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={formData.tel}
                  onChange={(e) => handleChange("tel", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Email Professionnel <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Entreprise <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.entreprise}
                  onChange={(e) => handleChange("entreprise", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Votre demande concerne</label>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {demandes.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleChange("demande", d)}
                      className={`px-5 py-2 rounded-full border text-sm font-inter transition-all ${
                        formData.demande === d
                          ? "border-[#0043F1] bg-[#0043F1] text-white"
                          : "border-[#0043F1] text-[#0043F1] bg-white hover:bg-[#0043F1]/5"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20 resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 rounded-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
