export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  document_id: number;
  question: string;
  answer: string;
}