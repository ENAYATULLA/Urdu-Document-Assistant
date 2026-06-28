"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { getToken } from "@/utils/storage";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}