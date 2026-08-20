import ResumeUpload from '@/components/resumes/ResumeUpload';
import ResumeGrid from '@/components/resumes/ResumeGrid';
import EmptyResumeState from '@/components/resumes/EmptyResumeState';
import { apiFetch } from '@/api/client';
import type { Resume, ResumeListResponse } from '@/types/resume';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ResumesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResumes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch('/resumes');
      if (!response.ok) {
        throw new Error(`Failed to load resumes (${response.status})`);
      }

      const data = (await response.json()) as ResumeListResponse;
      setResumes(data.resumes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadResumes();
  }, [loadResumes]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleUploadSelected = async () => {
    if (!selectedFile) {
      setError('Choose a PDF before uploading.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await apiFetch('/resumes?label=default', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed (${response.status})`);
      }

      await response.json();
      await loadResumes();
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-zinc-400">Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">Resumes</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage and tailor your professional documents for different roles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleUploadSelected}
          disabled={!selectedFile || uploading}
          className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-600/50"
        >
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </div>

      <ResumeUpload
        inputRef={fileInputRef}
        onFileSelected={handleFileSelected}
        selectedFile={selectedFile}
        uploading={uploading}
      />

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {resumes.length > 0 ? (
        <ResumeGrid resumes={resumes} />
      ) : (
        <EmptyResumeState onUploadClick={openFilePicker} />
      )}
    </div>
  );
}
