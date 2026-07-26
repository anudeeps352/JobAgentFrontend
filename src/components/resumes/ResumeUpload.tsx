import { UploadCloud } from 'lucide-react';

export default function ResumeUpload() {
  return (
    <div className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 hover:border-violet-500">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
        <UploadCloud className="h-6 w-6 text-violet-500" />
      </div>

      <p className="mt-6 text-white">Drop your PDF here or click to browse</p>

      <p className="mt-1 text-xs text-zinc-500">Maximum file size: 5MB</p>
    </div>
  );
}
