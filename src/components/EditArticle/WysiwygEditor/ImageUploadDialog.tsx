
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploadDialog as ImageUploadDialogType } from "./types";

interface ImageUploadDialogProps {
  imageDialog: ImageUploadDialogType;
  setImageDialog: (dialog: ImageUploadDialogType) => void;
  onInsertImage: () => void;
  isUploading: boolean;
}

const ImageUploadDialog = ({
  imageDialog,
  setImageDialog,
  onInsertImage,
  isUploading
}: ImageUploadDialogProps) => {
  return (
    <Dialog open={imageDialog.isOpen} onOpenChange={(open) => !open && setImageDialog({...imageDialog, isOpen: false})}>
      <DialogContent className="bg-white text-[#010D3E] border-[#E5E7EB]">
        <DialogHeader>
          <DialogTitle>Insérer une image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {imageDialog.imageUrl && (
            <div className="text-center">
              <img src={imageDialog.imageUrl} alt="Aperçu" className="max-w-full max-h-48 mx-auto rounded border border-[#E5E7EB]" />
            </div>
          )}
          
          <div>
            <Label htmlFor="file-name">Nom du fichier (SEO) - Sans extension</Label>
            <Input
              id="file-name"
              value={imageDialog.fileName}
              onChange={(e) => setImageDialog({...imageDialog, fileName: e.target.value})}
              placeholder="ex: article-ia-intelligence-artificielle"
              className="bg-white border-[#E5E7EB] text-[#010D3E]"
            />
            <p className="text-sm text-[#010D3E]/40 mt-1">Mots-clés séparés par des tirets pour le SEO</p>
          </div>
          
          <div>
            <Label htmlFor="alt-text">Texte alternatif (ALT)</Label>
            <Input
              id="alt-text"
              value={imageDialog.altText}
              onChange={(e) => setImageDialog({...imageDialog, altText: e.target.value})}
              placeholder="Décrivez l'image..."
              className="bg-white border-[#E5E7EB] text-[#010D3E]"
            />
          </div>
          
          <div>
            <Label>Alignement</Label>
            <Select value={imageDialog.alignment} onValueChange={(value) => setImageDialog({...imageDialog, alignment: value})}>
              <SelectTrigger className="bg-white border-[#E5E7EB] text-[#010D3E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#E5E7EB]">
                <SelectItem value="center">Centré</SelectItem>
                <SelectItem value="left">À gauche</SelectItem>
                <SelectItem value="right">À droite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setImageDialog({...imageDialog, isOpen: false})}
            className="border-[#E5E7EB] text-[#010D3E] hover:bg-[#F3F4F6]">
            Annuler
          </Button>
          <Button onClick={onInsertImage} disabled={isUploading}
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90">
            {isUploading ? 'Upload...' : 'Insérer l\'image'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
