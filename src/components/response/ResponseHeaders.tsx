import React from "react";

interface Props {
  headers: Record<string, string>[];
}

const ResponseHeaders = ({ headers }: Props) => {
  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="w-full flex flex-col divide-y divide-stroke-light-ter dark:divide-stroke-dark-ter">
        {headers.map((header, index) => (
          <div
            className="grid grid-cols-2 divide-x divide-stroke-light-ter dark:divide-stroke-dark-ter"
            key={index}
          >
            <div className="px-4 py-2 text-xs font-medium text-text-b-sec dark:text-text-w-sec truncate">
              {header.key}
            </div>
            <div className="px-4 py-2 text-xs font-medium text-text-b-sec dark:text-text-w-sec truncate">
              {header.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseHeaders;
