import { ImageIcon } from 'lucide-react';

export default function EmptyResumeState() {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Empty State Preview
      </p>

      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="rounded-xl bg-zinc-800 p-10">
          <ImageIcon size={120} className="text-zinc-600" />
        </div>

        <h2 className="mt-8 text-2xl font-semibold">
          Upload your first resume to get started
        </h2>

        <p className="mt-3 max-w-md text-center text-zinc-500">
          Our AI engine needs your resume to compare against job descriptions
          and give you tailored insights.
        </p>

        <button className="mt-8 rounded-lg bg-violet-600 px-8 py-3 hover:bg-violet-500">
          Upload Now
        </button>
      </div>
    </div>
  );
}
