
import { useToast } from "@/hooks/use-toast";

export const useFormWebhook = () => {
  const { toast } = useToast();

  const sendFormData = async (data: {
    form_name: string;
    form_id: string;
    fields: Record<string, any>;
    url?: string;
    utm_params?: Record<string, string | null>;
  }) => {
    // No-op: webhook secret removed
    console.log('Form data (no webhook configured):', data);
    return true;
  };

  return { sendFormData };
};
