import { useEffect, useState } from 'react';

import { apiFetch } from '@/api/client';
import AnalyzeResult from '@/components/analyze/AnalyzeResult';
import ApplicationForm from '@/components/applications/ApplicationForm';
import type { ApplicationCreatePayload } from '@/types/application';
import EmptyAnalysis from '@/components/analyze/EmptyAnalysis';
import JobDescriptionInput from '@/components/analyze/JobDescriptionInput';
import ResumeSelector from '@/components/analyze/ResumeSelector';
import type { AnalysisResult } from '@/types/analysis';
import type { Resume, ResumeListResponse } from '@/types/resume';

async function readResponseError(response: Response) {
  try {
    const payload = (await response.json()) as { detail?: string } | null;
    return payload?.detail ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export default function Analyze() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [savingApplication, setSavingApplication] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadResumes = async () => {
      try {
        setLoadingResumes(true);
        setError('');

        const response = await apiFetch('/resumes');

        if (!response.ok) {
          throw new Error(await readResponseError(response));
        }

        const data = (await response.json()) as ResumeListResponse;

        if (!isMounted) {
          return;
        }

        const items = data.resumes ?? [];
        setResumes(items);
        setSelectedResumeId((current) => current || items[0]?.id || '');
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load resumes.',
        );
      } finally {
        if (isMounted) {
          setLoadingResumes(false);
        }
      }
    };

    void loadResumes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      setError('Select a resume before analyzing.');
      return;
    }

    if (!jdText.trim()) {
      setError('Paste a job description before analyzing.');
      return;
    }

    try {
      setAnalyzing(true);
      setError('');

      const response = await apiFetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_id: selectedResumeId,
          jd_text: jdText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(await readResponseError(response));
      }

      const data = (await response.json()) as AnalysisResult;
      setResult(data);
    } catch (analyzeError) {
      setResult(null);
      setError(
        analyzeError instanceof Error
          ? analyzeError.message
          : 'Unable to analyze the resume.',
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateApplication = async (payload: ApplicationCreatePayload) => {
    if (!result) return;
    try {
      setSavingApplication(true);
      setError('');
      const response = await apiFetch('/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          analysis_id: result.id,
          resume_id: selectedResumeId,
        }),
      });
      if (!response.ok) throw new Error(await readResponseError(response));
      setShowApplicationForm(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save application.');
    } finally {
      setSavingApplication(false);
    }
  };

  const selectedResume = resumes.find((resume) => resume.id === selectedResumeId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Fit Analysis</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Paste a job description and select a resume to see how well you match.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-2">
        <JobDescriptionInput value={jdText} onChange={setJdText} />

        <div className="space-y-6">
          {loadingResumes ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
              Loading resumes...
            </div>
          ) : resumes.length > 0 ? (
            <ResumeSelector
              resumes={resumes}
              selected={selectedResumeId}
              onChange={setSelectedResumeId}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
            />
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-400">
              No resumes found. Upload a PDF on the Resumes page first.
            </div>
          )}

          {selectedResume ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
              Using resume: <span className="text-zinc-200">{selectedResume.label || selectedResume.filename}</span>
            </div>
          ) : null}

          {result ? (
            <>
              <AnalyzeResult result={result} onSave={() => setShowApplicationForm(true)} saving={savingApplication} />
              {showApplicationForm ? (
                <div className="rounded-xl border border-violet-500/30 bg-zinc-900 p-6">
                  <h2 className="mb-5 text-xl font-semibold">Add to Applications</h2>
                  <ApplicationForm
                    initialValues={{
                      company: result.company,
                      role: result.role,
                      analysis_id: result.id,
                      resume_id: selectedResumeId,
                      status: 'planned',
                    }}
                    submitting={savingApplication}
                    onCancel={() => setShowApplicationForm(false)}
                    onSubmit={handleCreateApplication}
                  />
                </div>
              ) : null}
            </>
          ) : <EmptyAnalysis />}
        </div>
      </div>
    </div>
  );
}
