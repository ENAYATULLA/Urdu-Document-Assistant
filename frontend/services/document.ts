import api from "./api";

import {
  DocumentResponse,
  OCRResultResponse,
} from "@/types/document";

import {
  ChatRequest,
  ChatResponse,
} from "@/types/chat";

export async function uploadDocument(
  title: string,
  file: File
) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const response = await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getDocuments() {
  const response =
    await api.get<DocumentResponse[]>(
      "/documents"
    );

  return response.data;
}

export async function processDocument(
  documentId: number
) {
  const response = await api.post(
    `/documents/${documentId}/process`
  );

  return response.data;
}

export async function translateDocument(
  documentId: number
) {
  const response = await api.post(
    `/documents/${documentId}/translate`
  );

  return response.data;
}

export async function summarizeDocument(
  documentId: number
) {
  const response = await api.post(
    `/documents/${documentId}/summary`
  );

  return response.data;
}

export async function getDocumentOCR(
  documentId: number
) {
  const response =
    await api.get<OCRResultResponse>(
      `/documents/${documentId}/ocr`
    );

  return response.data;
}

export async function askDocument(
  documentId: number,
  data: ChatRequest
) {
  const response =
    await api.post<ChatResponse>(
      `/documents/${documentId}/chat`,
      data
    );

  return response.data;
}
export async function downloadDocument(
  documentId: number
) {
  return `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}/download`;
}

export async function deleteDocument(
  documentId: number
) {
  const response = await api.delete(
    `/documents/${documentId}`
  );

  return response.data;
}