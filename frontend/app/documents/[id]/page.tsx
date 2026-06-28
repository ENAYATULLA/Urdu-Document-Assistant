"use client";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/common/Button";
import Loading from "@/components/ui/Loading";
import {
  askDocument,
  getDocumentOCR,
} from "@/services/document";

import { OCRResultResponse } from "@/types/document";

export default function DocumentDetailsPage() {

  const params = useParams();

  const id = Number(params.id);

  const [data, setData] =
    useState<OCRResultResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [chatLoading, setChatLoading] =
    useState(false);

  useEffect(() => {

    async function load() {

      try {

        const result =
          await getDocumentOCR(id);

        setData(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [id]);

  function cleanAIText(text?: string) {

    if (!text) return "";

    return text

      .replace(
        /Rules:[\s\S]*?Preserve original meaning\./gi,
        ""
      )

      .replace(
        /Only return the English translation\./gi,
        ""
      )

      .replace(
        /Do not explain\./gi,
        ""
      )

      .replace(
        /Do not add notes\./gi,
        ""
      )

      .replace(
        /ANSWER:/gi,
        ""
      )

      .replace(
        /TRANSLATION:/gi,
        ""
      )

      .replace(
        /SUMMARY:/gi,
        ""
      )

      .replace(/\n{3,}/g, "\n\n")

      .trim();

  }

  const translation = useMemo(
    () => cleanAIText(data?.translated_text),
    [data]
  );

  const summary = useMemo(
    () => cleanAIText(data?.summary),
    [data]
  );

  async function handleAsk() {

    if (!question.trim()) {

    toast.warning("Please enter a question.");
      return;

    }

    try {

      setChatLoading(true);

      const response =
        await askDocument(id, {
          question,
        });

      setAnswer(
        cleanAIText(response.answer)
      );

    } catch (error) {

      console.error(error);

      toast.error("AI Chat failed.");

    } finally {

      setChatLoading(false);

    }

  }

if (loading) {

  return (
    <Loading text="Loading document..." />
  );

}

  if (!data) {

    return (
      <div className="flex h-72 items-center justify-center">

        <p className="text-red-500">
          Document not found.
        </p>

      </div>
    );

  }

  return (

    <main className="mx-auto max-w-7xl p-8">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>

          <Link
            href="/documents"
            className="text-blue-600 hover:underline"
          >
            ← Back to Documents
          </Link>

          <h1 className="mt-4 text-4xl font-bold">
            Document Details
          </h1>

          <p className="mt-2 text-slate-500">
            OCR • Translation • Summary • AI Chat
          </p>

        </div>

        <StatusBadge
          status={data.status}
        />

      </div>

      <div className="space-y-8">
              <section className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-semibold">
              📄 OCR Text
            </h2>

            <span className="text-sm text-slate-500">
              Original OCR Output
            </span>

          </div>

          <div className="max-h-[420px] overflow-y-auto rounded-lg border bg-slate-50 p-5">

            {data.ocr_text ? (

              <pre className="whitespace-pre-wrap leading-7">
                {data.ocr_text}
              </pre>

            ) : (

              <p className="text-slate-500">
                OCR has not been generated yet.
              </p>

            )}

          </div>

        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-semibold">
              🌍 English Translation
            </h2>

            <span className="text-sm text-slate-500">
              AI Generated Translation
            </span>

          </div>

          <div className="max-h-[420px] overflow-y-auto rounded-lg border bg-slate-50 p-5">

            {translation ? (

              <pre className="whitespace-pre-wrap leading-7">
                {translation}
              </pre>

            ) : (

              <p className="text-slate-500">
                Translation has not been generated yet.
              </p>

            )}

          </div>

        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-2xl font-semibold">
              📝 AI Summary
            </h2>

            <span className="text-sm text-slate-500">
              AI Generated Summary
            </span>

          </div>

          <div className="rounded-lg border bg-slate-50 p-5">

            {summary ? (

              <pre className="whitespace-pre-wrap leading-7">
                {summary}
              </pre>

            ) : (

              <p className="text-slate-500">
                Summary has not been generated yet.
              </p>

            )}

          </div>

        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h2 className="text-2xl font-semibold">
              💬 Ask AI
            </h2>

            <p className="mt-2 text-slate-500">
              Ask questions about this document.
            </p>

          </div>

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Example: What is the purpose of this document?"
            className="h-36 w-full rounded-lg border p-4 outline-none focus:border-blue-600"
          />
                    <div className="mt-5 flex flex-wrap gap-3">

            <Button
              onClick={handleAsk}
              disabled={chatLoading}
            >
              {chatLoading
                ? "Thinking..."
                : "Ask AI"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
  setQuestion("");
  setAnswer("");
  toast.success("Chat cleared.");
}}
            >
              Clear
            </Button>

          </div>

          {answer && (

            <div className="mt-8 rounded-xl border bg-slate-50 p-6">

              <div className="mb-4 flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                  🤖 AI Answer
                </h3>

                <Button
                  variant="secondary"
                 onClick={() => {
  navigator.clipboard.writeText(answer);
  toast.success("Copied to clipboard.");
}}
                >
                  Copy
                </Button>

              </div>

              <pre className="whitespace-pre-wrap leading-7">
                {answer}
              </pre>

            </div>

          )}

          {!answer && (

            <div className="mt-8 rounded-xl border border-dashed p-8 text-center">

              <p className="text-slate-500">
                Ask a question to start chatting with your document.
              </p>

            </div>

          )}

        </section>

      </div>
          </main>

  );

}