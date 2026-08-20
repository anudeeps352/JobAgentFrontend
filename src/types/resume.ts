export interface Resume {
  id: string;
  filename: string;
  uploaded_at: string;
  label: string;
}

export interface ResumeListResponse {
  resumes: Resume[];
}

export interface UploadResumeResponse {
  message: string;
  resume: Resume;
}
