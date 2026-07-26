export type Status =
  'Applied' | 'OA' | 'Interviewing' | 'Offer' | 'Rejected' | 'Ghosted';

export interface TimelineEvent {
  title: string;
  date: string;
  completed: boolean;
}

export interface Application {
  id: number;
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
