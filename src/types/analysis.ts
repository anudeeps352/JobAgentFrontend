export interface ResumeOption {
  id: number;
  name: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  company: string;
  role: string;
  match: string;
  score: string;
  status?: string | null;
  resume_used: string;
  gaps: string[];
  suggestions: string[];
  full_analysis?: string | null;
}

export interface AnalyzeRequest {
  resume_id: string;
  jd_text: string;
}
