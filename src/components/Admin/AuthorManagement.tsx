import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { Author, getAuthorFullName } from '@/types/author';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Users, Loader2 } from 'lucide-react';

const AuthorManagement = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchAuthors(); }, []);

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase.from('authors' as any).select('*').order('last_name', { ascending: true });
      if (error) { console.error('Error fetching authors:', error); return; }
      setAuthors(data || []);
    } catch (error) { console.error('Error fetching authors:', error); }
    finally { setLoading(false); }
  };

  const handleAddAuthor = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({ title: "Erreur", description: "Prénom et nom obligatoires.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase.from('authors' as any).insert({ first_name: firstName.trim(), last_name: lastName.trim() });
      if (error) { toast({ title: "Erreur", description: "Impossible d'ajouter l'auteur.", variant: "destructive" }); return; }
      toast({ title: "Ajouté", description: `${firstName} ${lastName} ajouté.` });
      setFirstName(''); setLastName(''); setIsAddDialogOpen(false); fetchAuthors();
    } catch (error) { console.error('Error adding author:', error); }
    finally { setIsSaving(false); }
  };

  const handleEditAuthor = async () => {
    if (!selectedAuthor || !firstName.trim() || !lastName.trim()) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('authors' as any).update({ first_name: firstName.trim(), last_name: lastName.trim() }).eq('id', selectedAuthor.id);
      if (error) { toast({ title: "Erreur", description: "Impossible de modifier.", variant: "destructive" }); return; }
      toast({ title: "Modifié", description: "Auteur mis à jour." });
      setFirstName(''); setLastName(''); setSelectedAuthor(null); setIsEditDialogOpen(false); fetchAuthors();
    } catch (error) { console.error('Error updating author:', error); }
    finally { setIsSaving(false); }
  };

  const handleDeleteAuthor = async () => {
    if (!selectedAuthor) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from('authors' as any).delete().eq('id', selectedAuthor.id);
      if (error) { toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" }); return; }
      toast({ title: "Supprimé", description: `${getAuthorFullName(selectedAuthor)} supprimé.` });
      setSelectedAuthor(null); setIsDeleteDialogOpen(false); fetchAuthors();
    } catch (error) { console.error('Error deleting author:', error); }
    finally { setIsSaving(false); }
  };

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
        <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#0043F1]" />
            <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Auteurs</h3>
            <span className="text-xs text-[#010D3E]/30 font-inter">{authors.length}</span>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs gap-1.5 h-8">
                <Plus className="h-3.5 w-3.5" /> Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-[#E5E7EB] max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-jakarta text-[#010D3E]">Nouvel auteur</DialogTitle>
                <DialogDescription className="text-[#010D3E]/50 font-inter text-sm">Créez un profil d'auteur.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-1.5">
                  <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Prénom</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jean" className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Nom</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Dupont" className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-sm">Annuler</Button>
                <Button onClick={handleAddAuthor} disabled={isSaving} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm">
                  {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Ajouter'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {authors.map((author) => (
            <div key={author.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
              <span className="text-sm font-inter text-[#010D3E]">{author.first_name} {author.last_name}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#010D3E]/30 hover:text-[#0043F1] hover:bg-[#0043F1]/5"
                  onClick={() => { setSelectedAuthor(author); setFirstName(author.first_name); setLastName(author.last_name); setIsEditDialogOpen(true); }}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#010D3E]/30 hover:text-red-600 hover:bg-red-50"
                  onClick={() => { setSelectedAuthor(author); setIsDeleteDialogOpen(true); }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {authors.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-[#010D3E]/30 font-inter text-sm">Aucun auteur.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white border-[#E5E7EB] max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-jakarta text-[#010D3E]">Modifier l'auteur</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Prénom</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Nom</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-sm">Annuler</Button>
            <Button onClick={handleEditAuthor} disabled={isSaving} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-[#E5E7EB] max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-jakarta text-[#010D3E]">Supprimer ?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#010D3E]/50 font-inter text-sm">
              {selectedAuthor ? getAuthorFullName(selectedAuthor) : ''} sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-sm">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAuthor} className="bg-red-600 text-white hover:bg-red-700 font-inter text-sm">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AuthorManagement;
