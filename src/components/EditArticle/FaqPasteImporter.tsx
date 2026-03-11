import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardPaste, Check, AlertCircle, Sparkles, Edit2 } from 'lucide-react';
import { FaqItem } from '@/types/blog';
import { parseFaqFromText, detectFaqFormat, validateParsedFaq } from '@/utils/faqParser';

interface FaqPasteImporterProps {
  onImport: (faqs: FaqItem[]) => void;
}

const FaqPasteImporter = ({ onImport }: FaqPasteImporterProps) => {
  const [open, setOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [parsedFaqs, setParsedFaqs] = useState<FaqItem[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [detectedFormat, setDetectedFormat] = useState<string>('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAnalyze = () => {
    const format = detectFaqFormat(rawText);
    setDetectedFormat(format);
    
    const parsed = parseFaqFromText(rawText);
    const { valid, warnings: validationWarnings } = validateParsedFaq(parsed);
    
    setParsedFaqs(valid);
    setWarnings(validationWarnings);
    setIsAnalyzed(true);
  };

  const handleImport = () => {
    onImport(parsedFaqs);
    handleReset();
    setOpen(false);
  };

  const handleReset = () => {
    setRawText('');
    setParsedFaqs([]);
    setWarnings([]);
    setDetectedFormat('');
    setIsAnalyzed(false);
    setEditingIndex(null);
  };

  const updateParsedFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setParsedFaqs(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeParsedFaq = (index: number) => {
    setParsedFaqs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-archipel-cyan border-archipel-cyan hover:bg-archipel-cyan hover:text-archipel-dark"
        >
          <ClipboardPaste className="w-4 h-4 mr-2" />
          Importer FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-archipel-cyan" />
            Importer des FAQ par copier-coller
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Collez votre texte contenant des questions/réponses. Le système détectera automatiquement le format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isAnalyzed ? (
            <>
              <div className="space-y-2">
                <Label className="text-white">Collez votre texte ici</Label>
                <Textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder={`Exemples de formats supportés :

Q: Qu'est-ce que le GEO ?
R: Le GEO est l'optimisation pour les moteurs génératifs...

---

1. Qu'est-ce que le GEO ?
Le GEO est l'optimisation pour les moteurs génératifs...

---

**Qu'est-ce que le GEO ?**
Le GEO est l'optimisation pour les moteurs génératifs...`}
                  rows={10}
                  className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                />
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Formats reconnus :</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• <code className="text-archipel-cyan">Q:</code> / <code className="text-archipel-cyan">R:</code> - Format question/réponse explicite</li>
                  <li>• <code className="text-archipel-cyan">1. Question ?</code> - Questions numérotées</li>
                  <li>• <code className="text-archipel-cyan">**Question ?**</code> - Format markdown gras</li>
                  <li>• <code className="text-archipel-cyan">Question ?</code> suivi de la réponse</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Results section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-white font-medium">
                    {parsedFaqs.length} question(s) détectée(s)
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  Format : {detectedFormat}
                </span>
              </div>

              {warnings.length > 0 && (
                <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div className="text-sm text-yellow-200">
                      {warnings.map((warning, i) => (
                        <p key={i}>{warning}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                {parsedFaqs.map((faq, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      {editingIndex === index ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateParsedFaq(index, 'question', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm"
                          />
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateParsedFaq(index, 'answer', e.target.value)}
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-600 text-white rounded px-3 py-2 text-sm"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setEditingIndex(null)}
                            className="bg-archipel-cyan text-archipel-dark"
                          >
                            Terminé
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-white text-sm">
                              {index + 1}. {faq.question}
                            </h4>
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingIndex(index)}
                                className="h-7 w-7 p-0 text-gray-400 hover:text-white"
                              >
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeParsedFaq(index)}
                                className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {faq.answer}
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {parsedFaqs.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                  <p>Aucune question/réponse détectée.</p>
                  <p className="text-sm mt-2">Vérifiez le format de votre texte.</p>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          {isAnalyzed ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-gray-300 border-gray-600"
              >
                Recommencer
              </Button>
              <Button
                type="button"
                onClick={handleImport}
                disabled={parsedFaqs.length === 0}
                className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90"
              >
                Importer {parsedFaqs.length} FAQ
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-gray-300 border-gray-600"
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={handleAnalyze}
                disabled={!rawText.trim()}
                className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyser le texte
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FaqPasteImporter;
