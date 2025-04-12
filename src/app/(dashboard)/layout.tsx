"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-col-reverse md:flex-row w-full h-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
