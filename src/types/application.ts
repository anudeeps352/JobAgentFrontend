export type Status =
  | 'Planned'
  | 'Applied'
  | 'OA'
  | 'Interviewing'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted'
  | 'Withdrawn';

export interface TimelineEvent {
  title: string;
  date: string;
  completed: boolean;
}

export interface Application {
  id: string;
  analysis_id?: string | null;
  resume_id?: string | null;
  jd_id?: string | null;
  company: string;
  role: string;
  score: number;
  resume: string;
  status: Status;
  applied: string;
  expanded: boolean;

  gaps: string[];
  recommendations: string[];
  notes: string;

  timeline: TimelineEvent[];
}

export interface ApplicationRecord {
  id: string;
  analysis_id: string | null;
  resume_id: string | null;
  jd_id: string | null;
  company: string;
  role: string;
  status: string;
  source: string | null;
  job_url: string | null;
  notes: string | null;
  applied_at: string | null;
  created_at: string;
  updated_at: string;
  score: string | null;
  match: string | null;
  resume_used: string | null;
  gaps: string[];
  suggestions: string[];
}

export interface ApplicationListResponse {
  applications: ApplicationRecord[];
}

export interface ApplicationCreatePayload {
  analysis_id?: string;
  resume_id?: string;
  jd_id?: string;
  company: string;
  role: string;
  status: string;
  source?: string;
  job_url?: string;
  notes?: string;
  applied_at?: string;
}
