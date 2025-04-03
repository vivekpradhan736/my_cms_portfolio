import { useCallback } from "react";
import { Editor } from "@tiptap/react";

export const useImageUpload = (editor: Editor | null) => {
  return useCallback(async (file: File) => {
    if (!editor) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = `/api/files/${data.filename}`;

      // ✅ Insert the image into the editor at the current position
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  }, [editor]);
};
