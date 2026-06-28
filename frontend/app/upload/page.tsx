"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

import { uploadDocument } from "@/services/document";

export default function UploadPage() {
  const [title, setTitle] = useState("");

  const [file, setFile] = useState<File | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!title.trim()) {
      alert("Please enter document title.");
      return;
    }

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadDocument(
        title,
        file
      );

      alert(response.message);

      setTitle("");
      setFile(null);

    } catch (error: any) {
      console.error("Upload Error:", error);

      if (error.response) {
        alert(
          error.response.data.detail ||
            "Upload failed."
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <h1 className="mb-2 text-3xl font-bold">
        Upload Document
      </h1>

      <p className="mb-8 text-slate-500">
        Upload PDF or Image.
      </p>

      <div className="space-y-5 rounded-xl border bg-white p-8">

        <Input
          placeholder="Document Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <Button
          onClick={handleUpload}
          className="w-full"
        >
          {loading
            ? "Uploading..."
            : "Upload Document"}
        </Button>

      </div>

    </div>
  );
}