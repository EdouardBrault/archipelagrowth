import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, Shield, ShieldCheck, ShieldX, KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase.from('admin_users' as any).select('*').order('created_at', { ascending: false });
      if (error) { console.error('Error:', error); toast({ title: "Erreur", description: "Impossible de charger les admins.", variant: "destructive" }); return; }
      setAdmins(data || []);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const addAdmin = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({ title: "Erreur", description: "Email invalide.", variant: "destructive" });
      return;
    }
    setIsAdding(true);
    try {
      const { error } = await supabase.from('admin_users' as any).insert({ email: newEmail.toLowerCase().trim(), is_active: true });
      if (error) {
        toast({ title: "Erreur", description: error.code === '23505' ? "Email déjà enregistré." : "Impossible d'ajouter.", variant: "destructive" });
        return;
      }
      toast({ title: "Ajouté", description: `${newEmail} ajouté.` });
      setNewEmail(''); fetchAdmins();
    } catch (error) { console.error('Error:', error); }
    finally { setIsAdding(false); }
  };

  const toggleAdminStatus = async (id: string, currentStatus: boolean, email: string) => {
    try {
      const { error } = await supabase.from('admin_users' as any).update({ is_active: !currentStatus }).eq('id', id);
      if (error) { toast({ title: "Erreur", description: "Impossible de modifier.", variant: "destructive" }); return; }
      toast({ title: "Modifié", description: `${email} ${!currentStatus ? 'activé' : 'désactivé'}.` });
      fetchAdmins();
    } catch (error) { console.error('Error:', error); }
  };

  const deleteAdmin = async (id: string, email: string) => {
    try {
      const { error } = await supabase.from('admin_users' as any).delete().eq('id', id);
      if (error) { toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" }); return; }
      toast({ title: "Supprimé", description: `${email} supprimé.` });
      fetchAdmins();
    } catch (error) { console.error('Error:', error); }
  };

  const updateAdminPassword = async () => {
    if (!selectedAdmin || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erreur", description: "6 caractères minimum.", variant: "destructive" });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-admin-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`,
          },
          body: JSON.stringify({ email: selectedAdmin.email, newPassword }),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed');

      toast({ title: "Mis à jour", description: `Mot de passe de ${selectedAdmin.email} modifié.` });
      setPasswordModalOpen(false); setSelectedAdmin(null); setNewPassword(''); setConfirmPassword('');
    } catch (error) {
      console.error('Error:', error);
      toast({ title: "Erreur", description: error instanceof Error ? error.message : "Impossible de modifier.", variant: "destructive" });
    } finally { setIsUpdatingPassword(false); }
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-[#0043F1]" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#0043F1]" />
          <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Administrateurs</h3>
          <span className="text-xs text-[#010D3E]/30 font-inter">{admins.length}</span>
        </div>

        {/* Add form */}
        <div className="px-5 py-4 border-b border-[#E5E7EB]">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Email du nouvel admin"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="h-9 bg-white border-[#E5E7EB] text-[#010D3E] font-inter text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addAdmin()}
            />
            <Button onClick={addAdmin} disabled={isAdding} size="sm" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs shrink-0 gap-1.5 h-9">
              <UserPlus className="h-3.5 w-3.5" /> Ajouter
            </Button>
          </div>
        </div>

        {/* Admin list */}
        <div className="divide-y divide-[#E5E7EB]">
          {admins.map((admin) => (
            <div key={admin.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-sm font-inter text-[#010D3E]">{admin.email}</span>
                {admin.is_active ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-inter font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <ShieldCheck className="h-2.5 w-2.5" /> Actif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-inter font-medium text-[#010D3E]/40 bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                    <ShieldX className="h-2.5 w-2.5" /> Inactif
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#010D3E]/30 hover:text-[#0043F1] hover:bg-[#0043F1]/5"
                  onClick={() => { setSelectedAdmin(admin); setNewPassword(''); setConfirmPassword(''); setShowPassword(false); setPasswordModalOpen(true); }}
                  title="Modifier le mot de passe">
                  <KeyRound className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-[#010D3E]/30 hover:text-[#010D3E] hover:bg-[#F3F4F6] font-inter text-[10px]"
                  onClick={() => toggleAdminStatus(admin.id, admin.is_active, admin.email)}>
                  {admin.is_active ? 'Désactiver' : 'Activer'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#010D3E]/30 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white border-[#E5E7EB] max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-jakarta text-[#010D3E]">Supprimer ?</AlertDialogTitle>
                      <AlertDialogDescription className="text-[#010D3E]/50 font-inter text-sm">
                        <strong>{admin.email}</strong> sera supprimé des administrateurs.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-sm">Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteAdmin(admin.id, admin.email)} className="bg-red-600 text-white hover:bg-red-700 font-inter text-sm">
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          {admins.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-[#010D3E]/30 font-inter text-sm">Aucun administrateur.</p>
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="bg-white border-[#E5E7EB] max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-jakarta text-[#010D3E] flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#0043F1]" />
              Modifier le mot de passe
            </DialogTitle>
            <DialogDescription className="text-[#010D3E]/50 font-inter text-sm">
              Pour <strong>{selectedAdmin?.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Nouveau mot de passe</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter pr-10" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#010D3E]/30 hover:text-[#010D3E]/60" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Confirmer</Label>
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter ${confirmPassword && (passwordsMatch ? 'border-emerald-400' : 'border-red-400')}`}
                onKeyDown={(e) => e.key === 'Enter' && updateAdminPassword()} />
              {confirmPassword && !passwordsMatch && <p className="text-red-500 text-xs font-inter">Ne correspond pas</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordModalOpen(false)} className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-sm">Annuler</Button>
            <Button onClick={updateAdminPassword} disabled={isUpdatingPassword || !passwordsMatch} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm">
              {isUpdatingPassword ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminManagement;
