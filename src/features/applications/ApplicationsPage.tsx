import { useEffect, useState } from 'react';

import { apiFetch } from '@/api/client';
import ApplicationForm from '@/components/applications/ApplicationForm';
import ApplicationTable from '@/components/applications/ApplicationTable';
import EmptyGhostedState from '@/components/applications/EmptyGhostedState';
import FilterTabs from '@/components/applications/FilterTabs';
import SearchBar from '@/components/applications/SearchBar';
import StatsBar from '@/components/applications/StatsBar';
import type {
  Application,
  ApplicationCreatePayload,
  ApplicationListResponse,
  ApplicationRecord,
} from '@/types/application';

const displayStatus = (status: string): Application['status'] =>
  (status === 'oa'
    ? 'OA'
    : status.charAt(0).toUpperCase() + status.slice(1)) as Application['status'];

const toApplication = (record: ApplicationRecord): Application => ({
  id: record.id,
  analysis_id: record.analysis_id,
  resume_id: record.resume_id,
  jd_id: record.jd_id,
  company: record.company,
  role: record.role,
  score: Number.parseInt(record.score ?? '0', 10) || 0,
  resume: record.resume_used ?? 'Not selected',
  status: displayStatus(record.status),
  applied: record.applied_at
    ? new Date(record.applied_at).toLocaleDateString()
    : new Date(record.created_at).toLocaleDateString(),
  expanded: false,
  gaps: record.gaps,
  recommendations: record.suggestions,
  notes: record.notes ?? '',
  timeline: [],
});

async function readError(response: Response) {
  try {
    const payload = (await response.json()) as { detail?: string };
    return payload.detail ?? 'Request failed (' + response.status + ')';
  } catch {
    return 'Request failed (' + response.status + ')';
  }
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadApplications = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/applications');
      if (!response.ok) throw new Error(await readError(response));
      const data = (await response.json()) as ApplicationListResponse;
      setApplications(data.applications.map(toApplication));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications();
  }, []);

  const handleCreate = async (payload: ApplicationCreatePayload) => {
    try {
      setSaving(true);
      setError('');
      const response = await apiFetch('/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(await readError(response));
      setShowForm(false);
      await loadApplications();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save application.');
    } finally {
      setSaving(false);
    }
  };

  const visibleApplications =
    selectedStatus === 'All'
      ? applications
      : applications.filter(
          (application) =>
            application.status.toLowerCase() === selectedStatus.toLowerCase(),
        );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Applications</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Keep track of every application, feedback, and status update.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          Add Application
        </button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {showForm ? (
        <div className="rounded-xl border border-violet-500/30 bg-zinc-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">Add Application</h2>
          <ApplicationForm
            submitting={saving}
            onCancel={() => setShowForm(false)}
            onSubmit={handleCreate}
          />
        </div>
      ) : null}

      <SearchBar />
      <FilterTabs
        applications={applications}
        selected={selectedStatus}
        onChange={setSelectedStatus}
      />
      <StatsBar applications={applications} />

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-sm text-zinc-400">
          Loading applications...
        </div>
      ) : visibleApplications.length > 0 ? (
        <ApplicationTable applications={visibleApplications} />
      ) : selectedStatus === 'Ghosted' ? (
        <EmptyGhostedState />
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900 p-8 text-sm text-zinc-400">
          No applications found.
        </div>
      )}
    </div>
  );
}
