"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

import { getDocuments } from "@/services/document";
import { DocumentResponse } from "@/types/document";

export default function DashboardPage() {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  const totalDocuments = documents.length;

  const ocrCompleted = documents.filter(
    (doc) =>
      doc.status === "ocr_completed" ||
      doc.status === "translated" ||
      doc.status === "summarized"
  ).length;

  const translated = documents.filter(
    (doc) =>
      doc.status === "translated" ||
      doc.status === "summarized"
  ).length;

  const summarized = documents.filter(
    (doc) => doc.status === "summarized"
  ).length;

  return (
    <>
      <SectionTitle
        title="Dashboard"
        subtitle="Manage your Urdu documents from one place."
      />

      <div className="mb-8 flex flex-wrap gap-4">
        <Link href="/upload">
          <Button>Upload New Document</Button>
        </Link>

        <Link href="/documents">
          <Button variant="secondary">
            View Documents
          </Button>
        </Link>
      </div>

      {loading ? (
        <Loading text="Loading dashboard..." />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card
              title="Total Documents"
              value={totalDocuments}
            />

            <Card
              title="OCR Completed"
              value={ocrCompleted}
            />

            <Card
              title="Translated"
              value={translated}
            />

            <Card
              title="Summarized"
              value={summarized}
            />
          </div>

          <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
              Recent Documents
            </h2>

            {documents.length === 0 ? (
              <EmptyState
                title="No Documents Yet"
                description="Upload your first Urdu document to start OCR, translation, AI summary and document chat."
                buttonText="Upload Document"
                buttonHref="/upload"
              />
            ) : (
              <div className="space-y-4">
                {documents
                  .slice(0, 5)
                  .map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/documents/${doc.id}`}
                    >
                      <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition hover:bg-slate-50">
                        <div>
                          <p className="font-medium">
                            {doc.title}
                          </p>

                          <p className="text-sm text-slate-500">
                            {doc.original_filename}
                          </p>
                        </div>

                        <StatusBadge
                          status={doc.status}
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}