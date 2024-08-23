"use client";

import { useImageFormContext } from "#lib/providers/ImageFormProvider.jsx";

export default function ImageForm() {
  const { inputRef, handleFileChange } = useImageFormContext();

  return (
    <form>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </form>
  );
}
