import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface SeoFieldsSectionProps {
  metaTitle: string; metaDescription: string; title: string; excerpt: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  generating?: boolean;
  onGenerate?: () => void;
}

const SeoFieldsSection = ({ metaTitle, metaDescription, title, excerpt, onMetaTitleChange, onMetaDescriptionChange, generating, onGenerate }: SeoFieldsSectionProps) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">SEO</h3>
        {onGenerate && (
          <Button type="button" variant="outline" size="sm" onClick={onGenerate} disabled={generating}
            className="text-xs gap-1.5 text-[#0043F1] border-[#0043F1]/20 hover:bg-[#0043F1]/5 font-inter">
            {generating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {generating ? 'Génération...' : 'Auto-générer SEO + Extrait'}
          </Button>
        )}
      </div>
      
      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Meta Title</Label>
        <Input value={metaTitle} onChange={(e) => onMetaTitleChange(e.target.value)} placeholder={title || "Titre SEO"}
          className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" maxLength={65} />
        <span className="text-[10px] text-[#010D3E]/30 font-inter">{metaTitle.length}/65</span>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Meta Description</Label>
        <Textarea value={metaDescription} onChange={(e) => onMetaDescriptionChange(e.target.value)} placeholder={excerpt || "Description SEO"}
          className="bg-white border-[#E5E7EB] text-[#010D3E] font-inter text-sm" rows={2} maxLength={160} />
        <span className="text-[10px] text-[#010D3E]/30 font-inter">{metaDescription.length}/160</span>
      </div>
    </div>
  );
};

export default SeoFieldsSection;
