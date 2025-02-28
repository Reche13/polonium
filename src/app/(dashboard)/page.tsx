"use client";

import ActiveRequestHead from "@/components/activeRequest/ActiveRequestHead";
import RequestOptions from "@/components/activeRequest/RequestOptions";
import RequestURLBar from "@/components/activeRequest/RequestURLBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/primitives/Resizable";
import Response from "@/components/response/Response";

export default function Home() {
  return (
    <div className="w-full bg-bg-light-pri dark:bg-bg-dark-pri flex flex-col">
      <ActiveRequestHead />
      <div className="w-full flex-1">
        <div className="w-full h-full flex flex-col">
          <RequestURLBar />
          <div className="flex-1">
            <ResizablePanelGroup direction="vertical" className="w-full h-full">
              <ResizablePanel defaultSize={80} minSize={20} maxSize={80}>
                <RequestOptions />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={20} minSize={20} maxSize={80}>
                <Response />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
