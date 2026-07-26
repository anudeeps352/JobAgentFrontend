export interface ResumeOption {
  id: number;
  name: string;
}

export interface AnalysisResult {
  score: number;
  gaps: string[];
  suggestions: string[];
}
