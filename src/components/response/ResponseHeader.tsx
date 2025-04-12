import { formatBytes } from "@/lib/byteSize";
import { cn } from "@/lib/cn";
import React from "react";

interface Props {
  status: number;
  statusText: string;
  timeTaken: number;
  size: number;
}

const ResponseHeader = ({ status, statusText, timeTaken, size }: Props) => {
  const getStatusColor = (status: number): string => {
    if (status >= 100 && status < 200) return "text-blue-500";
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 300 && status < 400) return "text-indigo-500";
    if (status >= 400 && status < 500) return "text-red-500";
    if (status >= 500 && status < 600) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="w-full p-4 bg-bg-light-pri dark:bg-bg-dark-pri flex items-center gap-6 border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Status
        </span>
        <span className={cn("text-xs font-semibold", getStatusColor(status))}>
          {status} {statusText}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Time
        </span>
        <span className={cn("text-xs font-semibold", getStatusColor(status))}>
          {timeTaken.toFixed(1)} ms
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Size
        </span>
        <span className={cn("text-xs font-semibold", getStatusColor(status))}>
          {formatBytes(size)}
        </span>
      </div>
    </div>
  );
};

export default ResponseHeader;
