import React from "react";

const ResponseHeader = () => {
  return (
    <div className="w-full p-4 bg-bg-light-pri dark:bg-bg-dark-pri flex items-center gap-6 border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Status
        </span>
        <span className="text-xs font-semibold text-green-500">200 OK</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Time
        </span>
        <span className="text-xs font-semibold text-green-500">125.6 ms</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Size
        </span>
        <span className="text-xs font-semibold text-green-500">11.5 KB</span>
      </div>
    </div>
  );
};

export default ResponseHeader;
