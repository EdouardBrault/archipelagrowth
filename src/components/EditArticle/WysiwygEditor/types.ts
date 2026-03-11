
export interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface ImageUploadDialog {
  isOpen: boolean;
  file: File | null;
  altText: string;
  alignment: string;
  imageUrl: string;
  fileName: string;
}
