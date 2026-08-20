import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ApplicationCreatePayload } from '@/types/application';

interface Props {
  initialValues?: Partial<ApplicationCreatePayload>;
  submitting?: boolean;
  onCancel?: () => void;
  onSubmit: (payload: ApplicationCreatePayload) => void;
}

const statuses = ['planned', 'applied', 'oa', 'interviewing', 'offer', 'rejected', 'ghosted', 'withdrawn'];

export default function ApplicationForm({
  initialValues,
  submitting = false,
  onCancel,
  onSubmit,
}: Props) {
  const [company, setCompany] = useState(initialValues?.company ?? '');
  const [role, setRole] = useState(initialValues?.role ?? '');
  const [status, setStatus] = useState(initialValues?.status ?? 'planned');
  const [source, setSource] = useState(initialValues?.source ?? '');
  const [jobUrl, setJobUrl] = useState(initialValues?.job_url ?? '');
  const [notes, setNotes] = useState(initialValues?.notes ?? '');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...initialValues,
      company: company.trim(),
      role: role.trim(),
      status,
      source: source.trim() || undefined,
      job_url: jobUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-zinc-400">Company</span>
          <Input value={company} onChange={(event) => setCompany(event.target.value)} required />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-zinc-400">Role</span>
          <Input value={role} onChange={(event) => setRole(event.target.value)} required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-zinc-400">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm"
          >
            {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-zinc-400">Source</span>
          <Input value={source} onChange={(event) => setSource(event.target.value)} placeholder="LinkedIn, company site..." />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="text-zinc-400">Job URL</span>
        <Input value={jobUrl} onChange={(event) => setJobUrl(event.target.value)} type="url" placeholder="https://..." />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="text-zinc-400">Notes</span>
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Add private notes..." />
      </label>

      <div className="flex justify-end gap-3">
        {onCancel ? <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button> : null}
        <Button type="submit" disabled={submitting || !company.trim() || !role.trim()}>
          {submitting ? 'Saving...' : 'Save Application'}
        </Button>
      </div>
    </form>
  );
}
