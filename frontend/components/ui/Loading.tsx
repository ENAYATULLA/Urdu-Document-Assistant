export default function Loading({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="flex h-72 flex-col items-center justify-center">

      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

      <p className="mt-4 text-slate-500">
        {text}
      </p>

    </div>
  );
}