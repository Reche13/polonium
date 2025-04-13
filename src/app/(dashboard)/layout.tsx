"use client";

import Collection from "@/components/Collection";
import Header from "@/components/header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/primitives/Resizable";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-col-reverse md:flex-row w-full h-full">
        <Sidebar />

        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 min-w-0 h-full"
        >
          <ResizablePanel defaultSize={80} minSize={70} maxSize={85}>
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="hidden md:block"
          >
            <Collection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
