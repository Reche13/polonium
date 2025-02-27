"use client";

import ActiveRequestHead from "@/components/activeRequest/ActiveRequestHead";
import RequestOptions from "@/components/activeRequest/RequestOptions";
import RequestURLBar from "@/components/activeRequest/RequestURLBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/primitives/Resizable";

export default function Home() {
  return (
    <div className="w-full bg-bg-light-pri dark:bg-bg-dark-pri flex flex-col">
      <ActiveRequestHead />
      <div className="w-full flex-1">
        <div className="w-full h-full flex flex-col">
          <RequestURLBar />
          <div className="flex-1">
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full"
            >
              <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
                <RequestOptions />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
                <div className="bg-bg-light-pri dark:bg-bg-dark-pri  h-full">
                  Response
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
