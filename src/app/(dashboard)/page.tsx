"use client";

import ActiveRequestHead from "@/components/activeRequest/ActiveRequestHead";
import RequestOptions from "@/components/activeRequest/RequestOptions";
import RequestURLBar from "@/components/activeRequest/RequestURLBar";

export default function Home() {
  return (
    <div className="w-full bg-bg-light-pri dark:bg-bg-dark-pri">
      <ActiveRequestHead />
      <div className="w-full">
        <div className="w-full">
          <RequestURLBar />
          <RequestOptions />
        </div>
      </div>
    </div>
  );
}
