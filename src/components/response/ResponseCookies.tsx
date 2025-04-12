import React from "react";
import Tooltip from "../primitives/Tooltip";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
  cookies: Record<string, string>[];
}

const copySingleCookie = async (cookie: Record<string, string>) => {
  await navigator.clipboard.writeText(JSON.stringify(cookie));
  toast.success("Cookie copied");
};

const copyAllCookies = async (headers: Record<string, string>[]) => {
  await navigator.clipboard.writeText(JSON.stringify(headers));
  toast.success("Cookies copied");
};

const ResponseCookies = ({ cookies }: Props) => {
  return (
    <div className="w-full flex-1 flex min-h-0">
      <div className="w-full flex flex-col flex-1 min-h-0">
        <div className="px-4 py-2 flex items-center justify-between border-b border-stroke-light-ter dark:border-stroke-dark-ter">
          <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec ">
            Cookies List
          </span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-bg-dark-ter/30 dark:scrollbar-thumb-bg-light-ter/30 scrollbar-track-bg-light-sec dark:scrollbar-track-bg-dark-sec divide-y divide-stroke-light-ter dark:divide-stroke-dark-ter">
          <div className="relative grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr] divide-x divide-stroke-light-ter dark:divide-stroke-dark-ter text-text-b-sec dark:text-text-w-sec group">
            <div className="px-4 py-2 text-xs font-medium  truncate">Name</div>
            <div className="px-4 py-2 text-xs font-medium  truncate">Value</div>
            <div className="px-4 py-2 text-xs font-medium  truncate">
              Domain
            </div>
            <div className="px-4 py-2 text-xs font-medium  truncate">Path</div>
            <div className="px-4 py-2 text-xs font-medium  truncate">
              Expires
            </div>
            <div className="px-4 py-2 text-xs font-medium  truncate">
              Http Only
            </div>
            <div className="px-4 py-2 text-xs font-medium  truncate">
              Secure
            </div>
          </div>

          {cookies.map((cookie, index) => (
            <div
              className="relative grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr] divide-x divide-stroke-light-ter dark:divide-stroke-dark-ter text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri transition group"
              key={index}
            >
              <div className="px-4 py-2 text-xs font-medium  truncate">
                {cookie.name}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.value}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.domain ?? "unknown"}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.path ?? "/"}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.expires ?? "session"}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.httpOnly ? "True" : "False"}
              </div>
              <div className="px-4 py-2 text-xs font-medium truncate">
                {cookie.secure ? "True" : "False"}
              </div>

              <Tooltip content="Copy">
                <button
                  onClick={() => copySingleCookie(cookie)}
                  className="absolute right-4 top-2 bg-none outline-none border-none opacity-0 group-hover:opacity-100 transition duration-75 text-text-b-sec dark:text-text-w-sec"
                >
                  <Copy size={16} />
                </button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseCookies;
