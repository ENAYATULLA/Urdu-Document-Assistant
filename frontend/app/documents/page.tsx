"use client";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import { useEffect, useState } from "react";

import {
  getDocuments,
} from "@/services/document";

import {
  DocumentResponse,
} from "@/types/document";

import DocumentCard from "@/components/documents/DocumentCard";

export default function DocumentsPage() {

  const [documents, setDocuments] =
    useState<DocumentResponse[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadDocuments() {

    try {

      const data =
        await getDocuments();

      setDocuments(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadDocuments();

  }, []);

if (loading) {

  return (
    <Loading text="Loading documents..." />
  );

}

  return (
    <div>

      <h1 className="mb-2 text-3xl font-bold">
        My Documents
      </h1>

      <p className="mb-8 text-slate-500">
        Manage all uploaded documents.
      </p>

{documents.length === 0 ? (

  <EmptyState
    title="No Documents Found"
    description="Upload your first Urdu document to begin OCR, translation, AI summary and AI chat."
    buttonText="Upload Document"
    buttonHref="/upload"
  />

) : (

  <div className="space-y-5">

    {documents.map((document) => (

      <DocumentCard
        key={document.id}
        document={document}
        onRefresh={loadDocuments}
      />

    ))}

  </div>

)}

    </div>
  );
}