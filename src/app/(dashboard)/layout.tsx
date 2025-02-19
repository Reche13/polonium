"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
