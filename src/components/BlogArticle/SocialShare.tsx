
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare = ({ title, url }: SocialShareProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    mail: `mailto:?subject=${encodedTitle}&body=Je%20pensais%20que%20cet%20article%20pourrait%20t'intéresser%20:%20${encodedUrl}`
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (platform === 'mail') {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-gray-900 font-semibold mb-6 flex items-center">
        📢 Partagez cet article
      </h3>
      <div className="flex gap-4">
        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        
        <Button
          onClick={() => handleShare('whatsapp')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
        
        <Button
          onClick={() => handleShare('mail')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
