"use client";

import ActiveRequestHead from "@/components/activeRequest/ActiveRequestHead";
import RequestURLBar from "@/components/activeRequest/RequestURLBar";

export default function Home() {
  return (
    <div className="w-full bg-bg-light-pri dark:bg-bg-dark-pri">
      <ActiveRequestHead />
      <div className="w-full">
        <div className="w-full p-4">
          <RequestURLBar />
        </div>
      </div>
    </div>
  );
}
