export interface DocumentResponse {
  id: number;
  title: string;
  original_filename: string;
  file_path: string;
  status: string;
  uploaded_at: string;
}

export interface OCRResultResponse {
  document_id: number;
  status: string;

  ocr_text?: string;
  translated_text?: string;
  summary?: string;
  error_message?: string;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  document_id: number;
  question: string;
  answer: string;
}