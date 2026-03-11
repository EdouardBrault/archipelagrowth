import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Loader2 } from 'lucide-react';
import { compressImage } from './WysiwygEditor/utils';
import CoverImageGenerator from './CoverImageGenerator';

interface ImageUploadSectionProps {
  featuredImage: string; altText: string;
  articleTitle?: string;
  onImageChange: (url: string) => void;
  onAltTextChange: (text: string) => void;
}

const ImageUploadSection = ({ featuredImage, altText, articleTitle, onImageChange, onAltTextChange }: ImageUploadSectionProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      if (file.size > 10 * 1024 * 1024) throw new Error('Max 10 Mo');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type.toLowerCase())) throw new Error('Format non supporté');

      let processedFile: File;
      try { processedFile = await compressImage(file); } catch { processedFile = file; }

      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50)}`;
      const { error } = await supabase.storage.from('archipel-blog-images').upload(fileName, processedFile, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (error) throw new Error(error.message);
      const { data: publicUrlData } = supabase.storage.from('archipel-blog-images').getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    } catch (error) {
      toast({ title: "Erreur", description: error instanceof Error ? error.message : "Erreur d'upload", variant: "destructive" });
      return null;
    } finally { setIsUploading(false); }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) { onImageChange(url); toast({ title: "Uploadé", description: "Image ajoutée." }); }
    event.target.value = '';
  };

  return (
    <div className="space-y-5">
      <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Image mise en avant</h3>
      
      {featuredImage ? (
        <div className="relative inline-block">
          <img src={featuredImage} alt="Preview" className="max-w-md rounded-lg border border-[#E5E7EB]" />
          <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2 h-7 w-7 p-0"
            onClick={() => { onImageChange(''); onAltTextChange(''); }}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-[#0043F1]/30 transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-[#0043F1] animate-spin" />
              <p className="text-sm text-[#010D3E]/50 font-inter">Upload en cours...</p>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-[#010D3E]/20 mx-auto mb-3" />
              <p className="text-sm text-[#010D3E]/50 font-inter mb-1">Cliquez pour uploader</p>
              <p className="text-xs text-[#010D3E]/30 font-inter">JPG, PNG, WebP, GIF — Max 10 Mo</p>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="featured-upload" />
              <div className="flex gap-2 mt-4">
                <Button type="button" variant="outline" size="sm" className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-xs"
                  onClick={() => document.getElementById('featured-upload')?.click()}>
                  Choisir une image
                </Button>
                <CoverImageGenerator articleTitle={articleTitle || ''} onGenerated={onImageChange} />
              </div>
            </>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Texte alternatif</Label>
        <Input value={altText} onChange={(e) => onAltTextChange(e.target.value)} placeholder="Description de l'image"
          className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
      </div>
    </div>
  );
};

export default ImageUploadSection;
