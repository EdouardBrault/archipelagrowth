import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PublicationSectionProps {
  status: 'draft' | 'published';
  publishedAt?: string;
  onStatusChange: (value: 'draft' | 'published') => void;
  onPublishedAtChange?: (value: string) => void;
}

const PublicationSection = ({ status, publishedAt, onStatusChange, onPublishedAtChange }: PublicationSectionProps) => {
  // Format ISO date to datetime-local input value
  const toDatetimeLocal = (iso: string | undefined): string => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Publication</h3>
      
      <div className="flex flex-wrap gap-6">
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Statut</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#E5E7EB]">
              <SelectItem value="draft" className="text-[#010D3E] font-inter">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#010D3E]/20" />
                  Brouillon
                </span>
              </SelectItem>
              <SelectItem value="published" className="text-[#010D3E] font-inter">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Publié
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Date de publication</Label>
          <Input
            type="datetime-local"
            value={toDatetimeLocal(publishedAt)}
            onChange={(e) => {
              const val = e.target.value;
              onPublishedAtChange?.(val ? new Date(val).toISOString() : "");
            }}
            className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter w-56"
          />
        </div>
      </div>
    </div>
  );
};

export default PublicationSection;
