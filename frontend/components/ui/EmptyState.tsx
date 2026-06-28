import Link from "next/link";
import Button from "@/components/common/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">

      <div className="mb-5 text-6xl">
        📄
      </div>

      <h2 className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-slate-500">
        {description}
      </p>

      {buttonText && buttonHref && (
        <div className="mt-8">
          <Link href={buttonHref}>
            <Button>
              {buttonText}
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}