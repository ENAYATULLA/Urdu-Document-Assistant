interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const value = status.toLowerCase();

  let bg = "bg-slate-100";
  let text = "text-slate-700";
  let label = status;

  switch (value) {
    case "uploaded":
      bg = "bg-yellow-100";
      text = "text-yellow-700";
      label = "Uploaded";
      break;

    case "ocr_completed":
      bg = "bg-blue-100";
      text = "text-blue-700";
      label = "OCR Completed";
      break;

    case "translated":
      bg = "bg-purple-100";
      text = "text-purple-700";
      label = "Translated";
      break;

    case "summarized":
      bg = "bg-green-100";
      text = "text-green-700";
      label = "Summarized";
      break;
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${bg} ${text}`}
    >
      {label}
    </span>
  );
}