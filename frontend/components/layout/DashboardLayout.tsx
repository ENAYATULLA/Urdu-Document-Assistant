import { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex flex-1 flex-col">

        <Header />

        <section className="flex-1 p-6">
          {children}
        </section>

      </main>

    </div>
  );
}