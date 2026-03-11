
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Mail, Eye, Loader2, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

const ContactProtection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRevealContacts = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRevealed(true);
    setIsVerifying(false);
  };

  if (isRevealed) {
    return (
      <div className="space-y-3 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-[#0043F1] mb-2">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium font-inter">Contacts vérifiés</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#0043F1]" />
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-[#010D3E] hover:text-[#0043F1] transition-colors font-inter"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-inter">Protection anti-spam activée</span>
        </div>
        <p className="text-sm text-[#010D3E] font-inter">
          Cliquez pour révéler nos coordonnées
        </p>
        <Button
          onClick={handleRevealContacts}
          disabled={isVerifying}
          className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-full px-6"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Vérification...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Afficher les contacts
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContactProtection;
