
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormWebhook } from "@/hooks/useFormWebhook";
import { useToast } from "@/hooks/use-toast";
import { useUtmTracking } from "@/hooks/useUtmTracking";

const requestTypes = ["GEO Audit", "Paid Audit", "Recruitment", "Partnerships", "Press", "Other"];

interface ContactFormSectionConfig {
  cardTitle?: React.ReactNode;
  formTitle?: string;
  formDescription?: string;
}

interface ContactFormSectionProps {
  config?: ContactFormSectionConfig;
}

const ContactFormSection = ({ config }: ContactFormSectionProps) => {
  const cardTitle = config?.cardTitle || <>Join<br />ArchipelaGrowth</>;
  const formTitle = config?.formTitle || "Contact";
  const formDescription = config?.formDescription || "Need a GEO audit? Or more information about ArchipelaGrowth? Get in touch and we'll respond as quickly as possible!";

  const { sendFormData } = useFormWebhook();
  const { toast } = useToast();
  const { getUtmParams } = useUtmTracking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    company: "",
    requestType: "GEO Audit",
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
      await sendFormData({
        form_name: "Contact",
        form_id: "contact-form",
        fields: {
          nom: formData.lastName,
          prenom: formData.firstName,
          telephone: formData.phone,
          email: formData.email,
          entreprise: formData.company,
          demande: formData.requestType,
          message: formData.message,
        },
        url: window.location.href,
        utm_params: utmParams,
      });
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ lastName: "", firstName: "", phone: "", email: "", company: "", requestType: "GEO Audit", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
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
          <div className="rounded-3xl bg-cover bg-center flex items-end p-10 min-h-[500px]" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-score.png')" }}>
            <h2 className="font-jakarta text-5xl md:text-6xl font-bold text-white leading-[1.05]">{cardTitle}</h2>
          </div>

          <div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">{formTitle}</span>
            </h2>
            <p className="text-[#010D3E] font-inter mb-8">{formDescription}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">First Name <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="John" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Smith" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Phone <span className="text-red-500">*</span></label>
                <input type="tel" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Business Email <span className="text-red-500">*</span></label>
                <input type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Company <span className="text-red-500">*</span></label>
                <input type="text" required value={formData.company} onChange={(e) => handleChange("company", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Your request is about</label>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {requestTypes.map((d) => (
                    <button key={d} type="button" onClick={() => handleChange("requestType", d)} className={`px-5 py-2 rounded-full border text-sm font-inter transition-all ${formData.requestType === d ? "border-[#0043F1] bg-[#0043F1] text-white" : "border-[#0043F1] text-[#0043F1] bg-white hover:bg-[#0043F1]/5"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#010D3E] font-inter mb-1">Message</label>
                <textarea value={formData.message} onChange={(e) => handleChange("message", e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#0043F1]/20 resize-none" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 rounded-full">
                  {isSubmitting ? (<><Loader2 className="mr-2 w-4 h-4 animate-spin" />Sending...</>) : (<>Send<ArrowRight className="ml-2 w-4 h-4" /></>)}
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
