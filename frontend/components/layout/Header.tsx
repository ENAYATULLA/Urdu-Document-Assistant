import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-full p-2 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <UserCircle
          size={36}
          className="text-blue-600"
        />

      </div>

    </header>
  );
}