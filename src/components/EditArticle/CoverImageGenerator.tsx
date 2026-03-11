import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wand2, Loader2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BACKGROUNDS = [
  { src: '/lovable-uploads/bg-ocean-waves.png', label: 'Vagues' },
  { src: '/lovable-uploads/bg-ocean-calm.jpg', label: 'Océan calme' },
  { src: '/lovable-uploads/bg-fish-circle.webp', label: 'Banc de poissons' },
  { src: '/lovable-uploads/mesh-gradient-hero.png', label: 'Gradient Hero' },
  { src: '/lovable-uploads/mesh-gradient-blog.png', label: 'Gradient Blog' },
  { src: '/lovable-uploads/mesh-gradient-article.png', label: 'Gradient Article' },
  { src: '/lovable-uploads/mesh-gradient-llm.png', label: 'Gradient LLM' },
  { src: '/lovable-uploads/mesh-gradient-4.png', label: 'Gradient 4' },
  { src: '/lovable-uploads/mesh-gradient-5.png', label: 'Gradient 5' },
  { src: '/lovable-uploads/mesh-gradient-paid.png', label: 'Gradient Paid' },
  { src: '/lovable-uploads/mesh-gradient-reference.png', label: 'Gradient Ref' },
  { src: '/lovable-uploads/mesh-gradient-score.png', label: 'Gradient Score' },
];

interface CoverImageGeneratorProps {
  articleTitle: string;
  onGenerated: (url: string) => void;
}

const CoverImageGenerator = ({ articleTitle, onGenerated }: CoverImageGeneratorProps) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState(0);
  const [customTitle, setCustomTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayTitle = customTitle || articleTitle || 'Titre de l\'article';

  // Simplify title: take first ~6 words or meaningful short version
  const simplifyTitle = (title: string): string => {
    // Remove common filler words for a punchier overlay
    return title.length > 60 ? title.substring(0, 57) + '…' : title;
  };

  const renderCanvas = (bgImg: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    // Draw background covering full canvas
    const scale = Math.max(W / bgImg.width, H / bgImg.height);
    const sw = W / scale;
    const sh = H / scale;
    const sx = (bgImg.width - sw) / 2;
    const sy = (bgImg.height - sh) / 2;
    ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, W, H);

    // Dark overlay for readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 0, W, H);

    // Title text
    const title = simplifyTitle(displayTitle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';

    // Auto-size font to fit
    let fontSize = 64;
    ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", sans-serif`;

    // Word wrap
    const maxWidth = W - 160;
    const lines = wrapText(ctx, title.toUpperCase(), maxWidth);

    // Reduce font if too many lines
    while (lines.length > 3 && fontSize > 32) {
      fontSize -= 4;
      ctx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", sans-serif`;
      const newLines = wrapText(ctx, title.toUpperCase(), maxWidth);
      lines.length = 0;
      lines.push(...newLines);
    }

    const lineHeight = fontSize * 1.25;
    const totalHeight = lines.length * lineHeight;
    const startY = (H - totalHeight) / 2 + lineHeight / 2;

    // Text shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, startY + i * lineHeight);
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Archipel AI watermark bottom-right
    ctx.font = '500 18px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('archipel.ai', W - 40, H - 30);

    setPreviewUrl(canvas.toDataURL('image/jpeg', 0.92));
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  useEffect(() => {
    if (!open) return;
    setCustomTitle('');
    loadAndRender(selectedBg);
  }, [open]);

  useEffect(() => {
    if (open) loadAndRender(selectedBg);
  }, [selectedBg, displayTitle]);

  const loadAndRender = (bgIndex: number) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => renderCanvas(img);
    img.src = BACKGROUNDS[bgIndex].src;
  };

  const handleGenerate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error('Canvas export failed')), 'image/jpeg', 0.92);
      });

      const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.jpg`;
      const { error } = await supabase.storage
        .from('archipel-blog-images')
        .upload(fileName, blob, { cacheControl: '3600', upsert: false, contentType: 'image/jpeg' });

      if (error) throw error;

      const { data } = supabase.storage.from('archipel-blog-images').getPublicUrl(fileName);
      onGenerated(data.publicUrl);
      toast({ title: 'Image générée', description: 'Image de couverture créée avec succès.' });
      setOpen(false);
    } catch (err) {
      toast({ title: 'Erreur', description: err instanceof Error ? err.message : 'Erreur lors de la génération', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm"
          className="border-[#E5E7EB] text-[#010D3E]/60 font-inter text-xs gap-1.5">
          <Wand2 className="w-3.5 h-3.5" />
          Générer depuis un fond
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-jakarta text-[#010D3E]">Générer une image de couverture</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Custom title override */}
          <div className="space-y-1.5">
            <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">
              Titre affiché (laisser vide = titre de l'article)
            </Label>
            <Input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={articleTitle || "Titre de l'article"}
              className="h-10 bg-white border-[#E5E7EB] text-[#010D3E] font-inter"
            />
          </div>

          {/* Background picker */}
          <div className="space-y-1.5">
            <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Fond</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {BACKGROUNDS.map((bg, i) => (
                <button
                  key={bg.src}
                  type="button"
                  onClick={() => setSelectedBg(i)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedBg === i ? 'border-[#0043F1] ring-2 ring-[#0043F1]/20' : 'border-[#E5E7EB]'
                  }`}
                >
                  <img src={bg.src} alt={bg.label} className="w-full h-full object-cover" />
                  {selectedBg === i && (
                    <div className="absolute inset-0 bg-[#0043F1]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-1.5">
            <Label className="text-[#010D3E]/70 text-xs font-inter font-medium">Aperçu</Label>
            <div className="rounded-xl overflow-hidden border border-[#E5E7EB]">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full" />
              ) : (
                <div className="aspect-[1200/630] bg-[#F3F4F6] flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#010D3E]/30 animate-spin" />
                </div>
              )}
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex justify-end">
            <Button type="button" onClick={handleGenerate} disabled={isGenerating}
              className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm gap-1.5">
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              {isGenerating ? 'Génération...' : 'Utiliser cette image'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageGenerator;
