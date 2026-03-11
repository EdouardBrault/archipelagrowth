
import { DragEvent, ClipboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { renderPreview, htmlToMarkdown } from "./utils";

interface EditorContentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPreview: boolean;
  isDragging: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
}

const EditorContent = ({
  value,
  onChange,
  placeholder,
  showPreview,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop
}: EditorContentProps) => {
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    const htmlContent = clipboardData.getData('text/html');
    
    if (htmlContent && htmlContent.trim()) {
      e.preventDefault();
      const markdownContent = htmlToMarkdown(htmlContent);
      
      if (markdownContent && markdownContent !== clipboardData.getData('text/plain')) {
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        const newValue = value.substring(0, start) + markdownContent + value.substring(end);
        onChange(newValue);
        
        setTimeout(() => {
          const newPosition = start + markdownContent.length;
          textarea.setSelectionRange(newPosition, newPosition);
          textarea.focus();
        }, 0);
      }
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-[300px] p-4 bg-[#F9FAFB] border border-[#E5E7EB] border-t-0 rounded-b-lg">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative ${isDragging ? 'border-2 border-dashed border-[#0043F1] bg-[#0043F1]/5' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Textarea
        id="content-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        placeholder={placeholder || "Rédigez votre contenu ici... Glissez-déposez des images ou collez du contenu formaté"}
        rows={15}
        className="bg-white border-[#E5E7EB] border-t-0 text-[#010D3E] placeholder:text-[#010D3E]/30 resize-none rounded-t-none focus:border-[#0043F1]"
      />
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded">
          <div className="text-center text-[#010D3E]">
            <Upload className="w-8 h-8 mx-auto mb-2 text-[#0043F1]" />
            <p>Relâchez pour insérer l'image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorContent;
