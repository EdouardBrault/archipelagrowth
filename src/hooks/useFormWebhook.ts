
import { supabase } from "@/integrations/supabase/client";
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
    try {
      const { data: response, error } = await supabase.functions.invoke('send-form-data', {
        body: {
          ...data,
          timestamp: new Date().toISOString(),
        },
      });

      if (error) {
        console.error('Error sending form data:', error);
        // Don't show error to user - form submission should still appear successful
        return false;
      }

      console.log('Form data sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send form data:', error);
      // Don't show error to user - form submission should still appear successful
      return false;
    }
  };

  return { sendFormData };
};
