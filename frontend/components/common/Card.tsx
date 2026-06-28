interface CardProps {
  title: string;
  value?: number | string;
  description?: string;
}

export default function Card({
  title,
  value,
  description,
}: CardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="text-sm font-medium text-slate-500">
        {title}
      </h3>

      {value !== undefined && (
        <p className="mt-4 text-4xl font-bold text-slate-900">
          {value}
        </p>
      )}

      {description && (
        <p className="mt-4 text-slate-600">
          {description}
        </p>
      )}

    </div>
  );
}