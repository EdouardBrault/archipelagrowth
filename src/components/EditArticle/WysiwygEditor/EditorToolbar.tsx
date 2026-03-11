
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, Image, List, ListOrdered, Upload } from "lucide-react";

interface EditorToolbarProps {
  onHeading: (level: number) => void;
  onBold: () => void;
  onItalic: () => void;
  onLink: () => void;
  onImage: () => void;
  onList: (ordered: boolean) => void;
  onTogglePreview: () => void;
  showPreview: boolean;
  isUploading: boolean;
}

const EditorToolbar = ({
  onHeading,
  onBold,
  onItalic,
  onLink,
  onImage,
  onList,
  onTogglePreview,
  showPreview,
  isUploading
}: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-3 bg-[#F9FAFB] rounded-t-lg border border-[#E5E7EB]">
      <Button type="button" size="sm" variant="ghost" onClick={() => onHeading(2)}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Titre H2">
        H2
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={() => onHeading(3)}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Titre H3">
        H3
      </Button>
      <div className="w-px bg-[#E5E7EB] mx-1"></div>
      <Button type="button" size="sm" variant="ghost" onClick={onBold}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Gras">
        <Bold className="w-4 h-4" />
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={onItalic}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Italique">
        <Italic className="w-4 h-4" />
      </Button>
      <div className="w-px bg-[#E5E7EB] mx-1"></div>
      <Button type="button" size="sm" variant="ghost" onClick={onLink}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Lien">
        <Link className="w-4 h-4" />
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={onImage}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Image"
        disabled={isUploading}>
        {isUploading ? <Upload className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
      </Button>
      <div className="w-px bg-[#E5E7EB] mx-1"></div>
      <Button type="button" size="sm" variant="ghost" onClick={() => onList(false)}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Liste à puces">
        <List className="w-4 h-4" />
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={() => onList(true)}
        className="text-[#010D3E]/60 hover:text-[#010D3E] hover:bg-[#F3F4F6]" title="Liste numérotée">
        <ListOrdered className="w-4 h-4" />
      </Button>
      <div className="ml-auto">
        <Button type="button" size="sm" variant="outline" onClick={onTogglePreview}
          className="bg-white border-[#E5E7EB] text-[#010D3E] hover:bg-[#F3F4F6]">
          {showPreview ? 'Éditer' : 'Aperçu'}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
