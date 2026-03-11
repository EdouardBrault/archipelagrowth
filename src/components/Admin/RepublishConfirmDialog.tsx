import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, RefreshCw, Loader2 } from "lucide-react";

interface RepublishConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleCount: number;
  onConfirm: () => Promise<void>;
  isProcessing: boolean;
  progress: number;
}

const RepublishConfirmDialog = ({
  open,
  onOpenChange,
  articleCount,
  onConfirm,
  isProcessing,
  progress,
}: RepublishConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-[#E5E7EB]">
        <DialogHeader>
          <DialogTitle className="font-jakarta text-[#010D3E] flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-[#0043F1]" />
            Republier tous les articles
          </DialogTitle>
          <DialogDescription className="text-[#010D3E]/50 font-inter text-sm">
            {!isProcessing
              ? `${articleCount} article${articleCount > 1 ? 's' : ''} publié${articleCount > 1 ? 's' : ''} seront republié${articleCount > 1 ? 's' : ''}.`
              : 'Republication en cours...'}
          </DialogDescription>
        </DialogHeader>

        {!isProcessing ? (
          <div className="py-3">
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#010D3E]/60 font-inter space-y-1">
                <p>Chaque article sera temporairement dépublié puis republié.</p>
                <p>Durée estimée : ~{Math.ceil(articleCount * 3.5)} secondes.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-3">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-[#010D3E]/40 font-inter text-center">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        <DialogFooter>
          {!isProcessing ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#E5E7EB] text-[#010D3E]/60 hover:bg-[#F3F4F6] font-inter text-sm">
                Annuler
              </Button>
              <Button onClick={onConfirm} className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-sm">
                Confirmer
              </Button>
            </>
          ) : (
            <Button disabled className="font-inter text-sm">
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
              Traitement...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RepublishConfirmDialog;
