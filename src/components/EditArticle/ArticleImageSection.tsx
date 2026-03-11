import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { compressImage } from './WysiwygEditor/utils';

interface ArticleImageSectionProps {
  articleImage?: string; articleImageAlt?: string;
  onArticleImageChange: (url: string) => void;
  onArticleImageAltChange: (text: string) => void;
}

const ArticleImageSection = ({ articleImage, articleImageAlt, onArticleImageChange, onArticleImageAltChange }: ArticleImageSectionProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error('Max 10 Mo');
      let processedFile: File;
      try { processedFile = await compressImage(file); } catch { processedFile = file; }

      const fileName = `article-${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50)}`;
      const { error } = await supabase.storage.from('archipel-blog-images').upload(fileName, processedFile, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (error) throw new Error(error.message);
      const { data } = supabase.storage.from('archipel-blog-images').getPublicUrl(fileName);
      onArticleImageChange(data.publicUrl);
      toast({ title: "Uploadé", description: "Image d'article ajoutée." });
    } catch (error) {
      toast({ title: "Erreur", description: error instanceof Error ? error.message : "Erreur d'upload", variant: "destructive" });
    } finally { setIsUploading(false); event.target.value = ''; }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Image className="w-4 h-4 text-[#0043F1]" />
        <h3 className="font-jakarta font-semibold text-[#010D3E] text-sm">Image d'article</h3>
      </div>
      <p className="text-xs text-[#010D3E]/40 font-inter -mt-3">Apparaît sous le titre (optionnel)</p>

      {!articleImage ? (
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
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="article-image-upload" />
              <Button type="button" variant="outline" size="sm" className="mt-4 border-[#E5E7EB] text-[#010D3E]/60 font-inter text-xs"
                onClick={() => document.getElementById('article-image-upload')?.click()}>
                Choisir une image
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="relative group inline-block">
          <img src={articleImage} alt="Image d'article" className="w-full h-48 object-cover rounded-lg border border-[#E5E7EB]" />
          <Button type="button" variant="destructive" size="sm"
            className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => { onArticleImageChange(''); onArticleImageAltChange(''); }}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {articleImage && (
        <div className="space-y-1.5">
          <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Texte alternatif</Label>
          <Input value={articleImageAlt || ''} onChange={(e) => onArticleImageAltChange(e.target.value)} placeholder="Description de l'image"
            className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter" />
        </div>
      )}
    </div>
  );
};

export default ArticleImageSection;
