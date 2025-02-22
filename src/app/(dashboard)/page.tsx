"use client";

import ActiveRequestHead from "@/components/activeRequest/ActiveRequestHead";

export default function Home() {
  return (
    <div className="w-full">
      <ActiveRequestHead />
      <div className="">request url bar</div>
    </div>
  );
}
