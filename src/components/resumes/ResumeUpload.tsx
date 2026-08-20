import { type DragEvent, type RefObject, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface Props {
  inputRef: RefObject<HTMLInputElement | null>;
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
  uploading: boolean;
}

export default function ResumeUpload({
  inputRef,
  onFileSelected,
  selectedFile,
  uploading,
}: Readonly<Props>) {
  const [isDragging, setIsDragging] = useState(false);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPicker();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-zinc-950 transition-colors ${
        isDragging ? 'border-violet-500 bg-violet-500/5' : 'border-zinc-700 hover:border-violet-500'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }

          event.target.value = '';
        }}
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
        <UploadCloud className="h-6 w-6 text-violet-500" />
      </div>

      <p className="mt-6 text-white">
        {uploading
          ? 'Uploading resume...'
          : selectedFile
            ? 'Resume loaded. Click Upload Resume to confirm.'
            : 'Drop your PDF here or click to browse'}
      </p>

      <p className="mt-1 text-xs text-zinc-500">Maximum file size: 5MB</p>

      {selectedFile ? (
        <p className="mt-3 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
          Ready: {selectedFile.name}
        </p>
      ) : null}
    </div>
  );
}
