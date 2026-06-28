import Link from "next/link";

import Button from "../components/common/Button";
import Card from "../components/common/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">

        <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          AI Powered Urdu OCR Platform
        </span>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900">
          Urdu Document Assistant
        </h1>

        <p className="mb-10 max-w-3xl text-lg leading-8 text-slate-600">
          Upload historical Urdu documents, extract Urdu text,
          translate into English, generate AI summaries,
          and chat with your documents.
        </p>

        <div className="flex flex-wrap justify-center gap-4">

          <Link href="/login">
            <Button>
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button className="bg-white text-slate-700 border border-slate-300 hover:bg-slate-100">
              Register
            </Button>
          </Link>

        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3">

          <Card
            title="OCR Extraction"
            description="Extract Urdu text from scanned PDFs and images."
          />

          <Card
            title="AI Translation"
            description="Translate Urdu documents into English using Ollama."
          />

          <Card
            title="AI Chat"
            description="Ask questions about your uploaded documents."
          />

        </div>

      </section>
    </main>
  );
}