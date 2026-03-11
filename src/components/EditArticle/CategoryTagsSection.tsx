import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryTagsSectionProps {
  category: string; tags: string;
  onCategoryChange: (value: string) => void;
  onTagsChange: (value: string) => void;
}

const categories = ["Guide GEO", "Actualités IA", "Étude de cas", "Tutoriel", "Analyse", "Stratégie", "Outils"];

const CategoryTagsSection = ({ category, tags, onCategoryChange, onTagsChange }: CategoryTagsSectionProps) => {
  return (
    <div className="space-y-5">
      <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Catégorie & Tags</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Catégorie</Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#E5E7EB]">
              {categories.map((c) => (
                <SelectItem key={c} value={c} className="text-[#010D3E] font-inter">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Tags</Label>
          <Input value={tags} onChange={(e) => onTagsChange(e.target.value)} placeholder="GEO, IA, ChatGPT"
            className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
          <span className="text-[10px] text-[#010D3E]/30 font-inter">Séparés par des virgules</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryTagsSection;
