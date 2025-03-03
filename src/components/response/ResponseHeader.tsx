import React from "react";

interface Props {
  status: number;
  statusText: string;
  timeTaken: number;
  size: number;
}

const ResponseHeader = ({ status, statusText, timeTaken, size }: Props) => {
  return (
    <div className="w-full p-4 bg-bg-light-pri dark:bg-bg-dark-pri flex items-center gap-6 border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Status
        </span>
        <span className="text-xs font-semibold text-green-500">
          {status} {statusText}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Time
        </span>
        <span className="text-xs font-semibold text-green-500">
          {timeTaken.toFixed(1)} ms
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Size
        </span>
        <span className="text-xs font-semibold text-green-500">{size} b</span>
      </div>
    </div>
  );
};

export default ResponseHeader;
