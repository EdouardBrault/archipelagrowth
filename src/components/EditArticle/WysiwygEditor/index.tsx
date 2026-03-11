import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent as TiptapContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, List, ListOrdered, Loader2, Quote, Table as TableIcon, Plus, Minus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "./utils";
import ImageUploadDialog from "./ImageUploadDialog";
import { ImageUploadDialog as ImageUploadDialogType } from "./types";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const WysiwygEditor = ({ value, onChange, placeholder }: WysiwygEditorProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imageDialog, setImageDialog] = useState<ImageUploadDialogType>({
    isOpen: false, file: null, altText: '', alignment: 'center', imageUrl: '', fileName: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUpdatingRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        blockquote: {},
        bulletList: {},
        orderedList: {},
        horizontalRule: {},
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder || "Rédigez votre article ici..." }),
      Table.configure({ resizable: true, HTMLAttributes: { class: 'wysiwyg-table' } }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (!isUpdatingRef.current) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[400px]',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      isUpdatingRef.current = true;
      editor.commands.setContent(value || "");
      isUpdatingRef.current = false;
    }
  }, [value, editor]);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      if (file.size > 10 * 1024 * 1024) throw new Error('Max 10 Mo');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type.toLowerCase())) throw new Error('Format non supporté');

      let processedFile: File;
      try { processedFile = await compressImage(file); } catch { processedFile = file; }

      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 9);
      const extension = processedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `wysiwyg-${timestamp}-${randomStr}.${extension}`;

      const { error } = await supabase.storage
        .from('archipel-blog-images')
        .upload(fileName, processedFile, { cacheControl: '3600', upsert: false, contentType: processedFile.type });
      if (error) throw new Error(error.message);

      const { data: publicUrlData } = supabase.storage.from('archipel-blog-images').getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    } catch (error) {
      toast({ title: "Erreur d'upload", description: error instanceof Error ? error.message : 'Erreur inconnue', variant: "destructive" });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: "Format invalide", description: "Veuillez sélectionner une image.", variant: "destructive" });
      return;
    }
    const seoName = file.name.split('.')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setImageDialog({ isOpen: true, file, altText: '', alignment: 'center', imageUrl: URL.createObjectURL(file), fileName: seoName });
  };

  const insertImageWithOptions = async () => {
    if (!imageDialog.file || !editor) return;
    const uploadedUrl = await uploadImage(imageDialog.file);
    if (!uploadedUrl) return;

    editor.chain().focus().setImage({ src: uploadedUrl, alt: imageDialog.altText }).run();
    setImageDialog({ isOpen: false, file: null, altText: '', alignment: 'center', imageUrl: '', fileName: '' });
    toast({ title: "Image ajoutée" });
  };

  const insertLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = prompt('URL du lien:', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank', rel: 'noopener noreferrer' }).run();
  };

  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  if (!editor) return null;

  const wordCount = editor.getText().split(/\s+/).filter(w => w.length > 0).length;
  const isInTable = editor.isActive('table');

  const ToolbarButton = ({ onClick, isActive, disabled, title, children }: {
    onClick: () => void; isActive?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
  }) => (
    <button type="button" title={title} disabled={disabled} onClick={onClick}
      className={`p-2 rounded-md transition-all text-sm font-medium
        ${isActive ? 'bg-[#0043F1]/10 text-[#0043F1]' : 'text-[#010D3E]/50 hover:text-[#010D3E] hover:bg-[#F3F4F6]'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}>
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-[#FAFBFC] border-b border-[#E5E7EB]">
        <ToolbarButton title="Titre H2" isActive={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <span className="text-xs font-bold">H2</span>
        </ToolbarButton>
        <ToolbarButton title="Titre H3" isActive={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <span className="text-xs font-bold">H3</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-[#E5E7EB] mx-1.5" />

        <ToolbarButton title="Gras" isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Italique" isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-[#E5E7EB] mx-1.5" />

        <ToolbarButton title="Lien" isActive={editor.isActive('link')} onClick={insertLink}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Image" disabled={isUploading} onClick={() => fileInputRef.current?.click()}>
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </ToolbarButton>

        <div className="w-px h-5 bg-[#E5E7EB] mx-1.5" />

        <ToolbarButton title="Liste à puces" isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Liste numérotée" isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Citation" isActive={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-[#E5E7EB] mx-1.5" />

        <ToolbarButton title="Insérer un tableau" isActive={isInTable} onClick={insertTable}>
          <TableIcon className="w-4 h-4" />
        </ToolbarButton>

        {/* Table sub-toolbar */}
        {isInTable && (
          <>
            <ToolbarButton title="Ajouter une colonne" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              <div className="flex items-center gap-0.5"><Plus className="w-3 h-3" /><span className="text-[10px]">Col</span></div>
            </ToolbarButton>
            <ToolbarButton title="Supprimer la colonne" onClick={() => editor.chain().focus().deleteColumn().run()}>
              <div className="flex items-center gap-0.5"><Minus className="w-3 h-3" /><span className="text-[10px]">Col</span></div>
            </ToolbarButton>
            <ToolbarButton title="Ajouter une ligne" onClick={() => editor.chain().focus().addRowAfter().run()}>
              <div className="flex items-center gap-0.5"><Plus className="w-3 h-3" /><span className="text-[10px]">Lig</span></div>
            </ToolbarButton>
            <ToolbarButton title="Supprimer la ligne" onClick={() => editor.chain().focus().deleteRow().run()}>
              <div className="flex items-center gap-0.5"><Minus className="w-3 h-3" /><span className="text-[10px]">Lig</span></div>
            </ToolbarButton>
            <ToolbarButton title="Supprimer le tableau" onClick={() => editor.chain().focus().deleteTable().run()}>
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </ToolbarButton>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-[#010D3E]/30 font-inter tabular-nums">{wordCount} mots</span>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); e.target.value = ''; }} className="hidden" />

      {/* Editor area */}
      <TiptapContent editor={editor} className="
        [&_.ProseMirror]:px-6 [&_.ProseMirror]:py-5 [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror]:outline-none
        [&_.ProseMirror]:text-[#010D3E] [&_.ProseMirror]:text-base [&_.ProseMirror]:leading-[1.8] [&_.ProseMirror]:font-inter

        [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#010D3E]/25
        [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
        [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
        [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
        [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none

        [&_.ProseMirror_h2]:font-jakarta [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold
        [&_.ProseMirror_h2]:text-[#010D3E] [&_.ProseMirror_h2]:mt-8 [&_.ProseMirror_h2]:mb-3
        [&_.ProseMirror_h2]:border-l-4 [&_.ProseMirror_h2]:border-[#0043F1] [&_.ProseMirror_h2]:pl-3

        [&_.ProseMirror_h3]:font-jakarta [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold
        [&_.ProseMirror_h3]:text-[#010D3E] [&_.ProseMirror_h3]:mt-6 [&_.ProseMirror_h3]:mb-2
        [&_.ProseMirror_h3]:border-l-3 [&_.ProseMirror_h3]:border-[#0043F1]/50 [&_.ProseMirror_h3]:pl-3

        [&_.ProseMirror_p]:mb-4

        [&_.ProseMirror_strong]:font-semibold [&_.ProseMirror_strong]:text-[#010D3E]

        [&_.ProseMirror_a]:text-[#0043F1] [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:underline-offset-2

        [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto
        [&_.ProseMirror_img]:my-4 [&_.ProseMirror_img]:shadow-sm [&_.ProseMirror_img]:mx-auto [&_.ProseMirror_img]:block

        [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-4 [&_.ProseMirror_ul]:space-y-1
        [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-4 [&_.ProseMirror_ol]:space-y-1
        [&_.ProseMirror_li]:leading-[1.7]
        [&_.ProseMirror_li_p]:mb-0

        [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-[#0043F1]/30
        [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:py-1 [&_.ProseMirror_blockquote]:my-4
        [&_.ProseMirror_blockquote]:bg-[#F8F9FB] [&_.ProseMirror_blockquote]:rounded-r-lg
        [&_.ProseMirror_blockquote_p]:text-[#010D3E]/60 [&_.ProseMirror_blockquote_p]:italic

        [&_.ProseMirror_hr]:border-[#E5E7EB] [&_.ProseMirror_hr]:my-8

        [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:my-6 [&_.ProseMirror_table]:rounded-lg [&_.ProseMirror_table]:overflow-hidden
        [&_.ProseMirror_th]:bg-[#010D3E] [&_.ProseMirror_th]:text-white [&_.ProseMirror_th]:font-semibold [&_.ProseMirror_th]:text-sm
        [&_.ProseMirror_th]:px-4 [&_.ProseMirror_th]:py-3 [&_.ProseMirror_th]:text-left [&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-[#010D3E]/20
        [&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-[#E5E7EB] [&_.ProseMirror_td]:px-4 [&_.ProseMirror_td]:py-3 [&_.ProseMirror_td]:text-sm
        [&_.ProseMirror_tr:nth-child(even)_td]:bg-[#F9FAFB]
        [&_.ProseMirror_.selectedCell]:bg-[#0043F1]/10
      " />

      <ImageUploadDialog imageDialog={imageDialog} setImageDialog={setImageDialog}
        onInsertImage={insertImageWithOptions} isUploading={isUploading} />
    </div>
  );
};

export default WysiwygEditor;
