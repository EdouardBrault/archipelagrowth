import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface ArticleDeleteDialogProps {
  articleId: string;
  articleTitle: string;
  onDelete: (id: string, title: string) => void;
}

const ArticleDeleteDialog = ({ articleId, articleTitle, onDelete }: ArticleDeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-[#010D3E]/40 hover:text-red-600 hover:bg-red-50"
          title="Supprimer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-[#E5E7EB] max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-jakarta text-[#010D3E]">
            Supprimer cet article ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#010D3E]/50 font-inter text-sm">
            L'article <strong>"{articleTitle}"</strong> sera définitivement supprimé. Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#E5E7EB] text-[#010D3E]/60 hover:bg-[#F3F4F6] font-inter text-sm">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(articleId, articleTitle)}
            className="bg-red-600 text-white hover:bg-red-700 font-inter text-sm"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ArticleDeleteDialog;
