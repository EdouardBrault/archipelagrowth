import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Eye, EyeOff, Check, Loader2 } from 'lucide-react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({ title: "Erreur", description: "Remplissez les deux champs.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erreur", description: "6 caractères minimum.", variant: "destructive" });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Mis à jour", description: "Mot de passe modifié." });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB]">
      <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-[#0043F1]" />
        <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Mot de passe</h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Nouveau mot de passe</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#010D3E]/30 hover:text-[#010D3E]/60"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Confirmer</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter pr-10 ${
                confirmPassword && (passwordsMatch ? 'border-emerald-400' : 'border-red-400')
              }`}
              onKeyDown={(e) => e.key === 'Enter' && handleChangePassword()}
            />
            {passwordsMatch && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            )}
          </div>
          {confirmPassword && !passwordsMatch && (
            <p className="text-red-500 text-xs font-inter">Ne correspond pas</p>
          )}
        </div>

        <Button 
          onClick={handleChangePassword}
          disabled={isUpdating || !passwordsMatch}
          size="sm"
          className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs"
        >
          {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <KeyRound className="h-3.5 w-3.5 mr-1.5" />}
          Mettre à jour
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
