import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WysiwygEditor from './WysiwygEditor';
import { useAuthors } from '@/hooks/useAuthors';

interface BasicInfoSectionProps {
  title: string; slug: string; author: string; excerpt: string; content: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

const BasicInfoSection = ({ title, slug, author, excerpt, content, onTitleChange, onSlugChange, onAuthorChange, onExcerptChange, onContentChange }: BasicInfoSectionProps) => {
  const { getAuthorOptions, loading: authorsLoading } = useAuthors();
  const authorOptions = getAuthorOptions();

  return (
    <div className="space-y-5">
      <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Informations de base</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Titre *</Label>
          <Input value={title} onChange={(e) => onTitleChange(e.target.value)} className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" maxLength={65} />
          <span className="text-[10px] text-[#010D3E]/30 font-inter">{title.length}/65</span>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Slug *</Label>
          <Input value={slug} onChange={(e) => onSlugChange(e.target.value)} className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Auteur *</Label>
        <Select value={author} onValueChange={onAuthorChange} disabled={authorsLoading}>
          <SelectTrigger className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter">
            <SelectValue placeholder={authorsLoading ? "Chargement..." : "Sélectionnez un auteur"} />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#E5E7EB]">
            {authorOptions.length === 0 ? (
              <SelectItem value="__none" disabled className="text-[#010D3E]/50 font-inter">Aucun auteur</SelectItem>
            ) : (
              authorOptions.map((option) => (
                <SelectItem key={option.id} value={option.value} className="text-[#010D3E] font-inter">{option.label}</SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Extrait</Label>
        <Textarea value={excerpt} onChange={(e) => onExcerptChange(e.target.value)} rows={2}
          className="bg-white border-[#E5E7EB] text-[#010D3E] font-inter text-sm" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Contenu *</Label>
        <WysiwygEditor value={content} onChange={onContentChange} placeholder="Rédigez votre article ici..." />
      </div>
    </div>
  );
};

export default BasicInfoSection;
