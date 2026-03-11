import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, GripVertical, Sparkles, Loader2 } from 'lucide-react';
import FaqSectionEditor from './FaqSectionEditor';
import FaqPasteImporter from './FaqPasteImporter';
import { FaqItem, FaqSection } from '@/types/blog';
import { useToast } from '@/hooks/use-toast';

interface FaqEditorProps {
  faq: FaqItem[];
  faqSections: FaqSection[];
  onChange: (faq: FaqItem[], faqSections: FaqSection[]) => void;
  articleContent?: string;
  articleTitle?: string;
  articleCategory?: string;
}

const FaqEditor = ({ faq, faqSections, onChange, articleContent, articleTitle, articleCategory }: FaqEditorProps) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateFaq = async () => {
    if (!articleContent || articleContent.trim().length < 100) {
      toast({ title: "Contenu insuffisant", description: "L'article doit contenir au moins 100 caractères pour générer une FAQ.", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-faq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ content: articleContent, title: articleTitle, category: articleCategory }),
      });
      
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Erreur ${response.status}`);
      }

      const data = await response.json();
      if (data.faq && Array.isArray(data.faq)) {
        onChange([...faq, ...data.faq], faqSections);
        toast({ title: "✨ FAQ générée !", description: `${data.faq.length} questions ajoutées avec succès.` });
      }
    } catch (error) {
      console.error('FAQ generation error:', error);
      toast({ title: "Erreur de génération", description: error instanceof Error ? error.message : "Impossible de générer la FAQ.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const addQuestion = () => onChange([...faq, { question: '', answer: '' }], faqSections);
  const handleImportFaq = (importedFaqs: FaqItem[]) => onChange([...faq, ...importedFaqs], faqSections);
  const removeQuestion = (index: number) => onChange(faq.filter((_, i) => i !== index), faqSections);
  const updateQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    onChange(faq.map((item, i) => i === index ? { ...item, [field]: value } : item), faqSections);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => { setDraggedItem(index); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) { setDraggedItem(null); return; }
    const newFaq = [...faq];
    const dragged = newFaq[draggedItem];
    newFaq.splice(draggedItem, 1);
    newFaq.splice(draggedItem < dropIndex ? dropIndex - 1 : dropIndex, 0, dragged);
    onChange(newFaq, faqSections);
    setDraggedItem(null);
  };

  const migrateToSections = () => {
    if (faq.length === 0) return;
    onChange([], [...faqSections, { id: crypto.randomUUID(), title: 'Questions fréquentes', questions: [...faq] }]);
  };

  return (
    <div className="space-y-5">
      <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">FAQ</h3>
      <p className="text-xs text-[#010D3E]/40 font-inter -mt-3">Organisez vos questions par sections ou format simple</p>

      <Tabs defaultValue={faqSections.length > 0 ? "sections" : "simple"} className="w-full">
        <TabsList className="bg-[#F3F4F6] p-0.5 rounded-lg">
          <TabsTrigger value="simple" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-inter rounded-md">
            Simple
          </TabsTrigger>
          <TabsTrigger value="sections" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-inter rounded-md">
            Par sections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#010D3E]/40 font-inter">{faq.length} question{faq.length > 1 ? 's' : ''}</span>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  onClick={generateFaq} 
                  disabled={isGenerating}
                  size="sm" 
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 font-inter text-xs gap-1.5 h-8"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {isGenerating ? 'Génération...' : 'Générer avec IA'}
                </Button>
                <FaqPasteImporter onImport={handleImportFaq} />
                <Button type="button" onClick={addQuestion} size="sm" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs gap-1.5 h-8">
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </Button>
              </div>
            </div>

          {faq.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#010D3E]/30 font-inter text-sm">Aucune question. Cliquez sur "Ajouter".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {faq.map((item, index) => (
                <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 space-y-3"
                  draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-3.5 h-3.5 text-[#010D3E]/20 cursor-move" />
                      <span className="text-xs font-inter text-[#010D3E]/40">Q{index + 1}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#010D3E]/30 hover:text-red-600 hover:bg-red-50" onClick={() => removeQuestion(index)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Question</Label>
                    <Input value={item.question} onChange={(e) => updateQuestion(index, 'question', e.target.value)} placeholder="Votre question..."
                      className="h-9 bg-white border-[#E5E7EB] text-[#010D3E] font-inter text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Réponse</Label>
                    <Textarea value={item.answer} onChange={(e) => updateQuestion(index, 'answer', e.target.value)} placeholder="Votre réponse..."
                      rows={3} className="bg-white border-[#E5E7EB] text-[#010D3E] font-inter text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {faq.length > 0 && (
            <div className="flex justify-center">
              <button type="button" onClick={migrateToSections} className="text-xs text-[#0043F1] font-inter hover:underline">
                Migrer vers les sections
              </button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sections" className="space-y-4 mt-4">
          {faq.length > 0 && faqSections.length === 0 && (
            <div className="bg-[#0043F1]/5 border border-[#0043F1]/10 rounded-lg p-4">
              <p className="text-xs text-[#010D3E]/60 font-inter mb-2">{faq.length} question(s) en format simple.</p>
              <Button type="button" onClick={migrateToSections} size="sm" className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs h-7">
                Migrer
              </Button>
            </div>
          )}
          <FaqSectionEditor faqSections={faqSections} onChange={(newSections) => onChange(faq, newSections)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FaqEditor;
