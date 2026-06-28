"use client";

import { useState } from "react";
import Link from "next/link";

import Button from "@/components/common/Button";
import StatusBadge from "@/components/ui/StatusBadge";

import { DocumentResponse } from "@/types/document";
import { toast } from "sonner";

import {
  processDocument,
  translateDocument,
  summarizeDocument,
  downloadDocument,
  deleteDocument,
} from "@/services/document";

interface DocumentCardProps {
  document: DocumentResponse;
  onRefresh: () => void;
}

export default function DocumentCard({
  document,
  onRefresh,
}: DocumentCardProps) {
  const [loading, setLoading] = useState(false);

  const status = document.status.toLowerCase();

  const canOCR =
    status === "uploaded";

  const canTranslate =
    status === "ocr_completed";

  const canSummary =
    status === "translated";

  async function handleOCR() {
    try {
      setLoading(true);

      await processDocument(document.id);

      onRefresh();
    } catch (error) {
      console.error(error);
toast.error("OCR processing failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTranslate() {
    try {
      setLoading(true);

      await translateDocument(document.id);

      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Translation failed.");   
     } finally {
      setLoading(false);
    }
  }

  async function handleSummary() {
    try {
      setLoading(true);

      await summarizeDocument(document.id);

      onRefresh();
    } catch (error) {
      console.error(error);
toast.error("Summary generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {

  const url = await downloadDocument(
    document.id
  );

  window.open(url, "_blank");

}

async function handleDelete() {

  const confirmDelete = window.confirm(
    "Delete this document?"
  );

  if (!confirmDelete) return;

  try {

    setLoading(true);

    await deleteDocument(document.id);

    toast.success(
      "Document deleted successfully."
    );

    onRefresh();

  } catch (error) {

    console.error(error);

    toast.error(
      "Delete failed."
    );

  } finally {

    setLoading(false);

  }

}

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <Link href={`/documents/${document.id}`}>
            <h2 className="cursor-pointer text-2xl font-semibold text-blue-600 hover:underline">
              {document.title}
            </h2>
          </Link>

          <p className="mt-2 text-sm text-slate-500">
            {document.original_filename}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Uploaded
          </p>

          <p className="font-medium">
            {new Date(
              document.uploaded_at
            ).toLocaleString()}
          </p>

        </div>

        <StatusBadge
          status={document.status}
        />

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <Button
          onClick={handleOCR}
          disabled={!canOCR || loading}
        >
          {loading && canOCR
            ? "Processing..."
            : "Process OCR"}
        </Button>

        <Button
          variant="secondary"
          onClick={handleTranslate}
          disabled={!canTranslate || loading}
        >
          {loading && canTranslate
            ? "Translating..."
            : "Translate"}
        </Button>

        <Button
          variant="secondary"
          onClick={handleSummary}
          disabled={!canSummary || loading}
        >
          {loading && canSummary
            ? "Generating..."
            : "Summary"}
        </Button>

        <Link href={`/documents/${document.id}`}>
  <Button variant="secondary">
    Open
  </Button>
</Link>

<Button
  variant="secondary"
  onClick={handleDownload}
>
  Download
</Button>

<Button
  variant="secondary"
  onClick={handleDelete}
>
  Delete
</Button>

      </div>

    </div>
  );
}