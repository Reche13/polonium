import { Copy } from "lucide-react";
import React from "react";

interface Props {
  headers: Record<string, string>[];
}

const copySingleHeader = async (value: string) => {
  await navigator.clipboard.writeText(value);
  alert("copied");
};

const copyAllHeaders = async (headers: Record<string, string>[]) => {
  await navigator.clipboard.writeText(JSON.stringify(headers));
  alert("copied");
};

const ResponseHeaders = ({ headers }: Props) => {
  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="w-full flex flex-col divide-y divide-stroke-light-ter dark:divide-stroke-dark-ter">
        <div className="px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
            Headers List
          </span>
          <button
            onClick={() => copyAllHeaders(headers)}
            className="bg-none outline-none border-none text-text-b-sec dark:text-text-w-sec"
          >
            <Copy size={16} />
          </button>
        </div>
        {headers.map((header, index) => (
          <div
            className="relative grid grid-cols-2 divide-x divide-stroke-light-ter dark:divide-stroke-dark-ter text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri transition group"
            key={index}
          >
            <div className="px-4 py-2 text-xs font-medium  truncate">
              {header.key}
            </div>
            <div className="px-4 py-2 text-xs font-medium truncate">
              {header.value}
            </div>
            <button
              onClick={() => copySingleHeader(header.value)}
              className="absolute right-4 top-2 bg-none outline-none border-none opacity-0 group-hover:opacity-100 transition duration-75 text-text-b-sec dark:text-text-w-sec"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseHeaders;
