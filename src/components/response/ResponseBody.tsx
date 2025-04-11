import React from "react";
import ResponseBodyView from "../body/ResponseBodyView";
import { downloadFile } from "@/lib/donwloadFile";
import { getMimeType } from "@/lib/mimes";
import Tooltip from "../primitives/Tooltip";
import { Copy, Download } from "lucide-react";

const ResponseBody = ({
  data,
  type,
}: {
  data: string;
  type: ResponseDataType;
}) => {
  const handleDownload = () => {
    const { mime, ext } = getMimeType(type);
    const fileName = `response.${ext}`;
    downloadFile(data, fileName, mime);
  };

  const copyResponse = async () => {
    await navigator.clipboard.writeText(data);
    alert("copied");
  };

  return (
    <div className="w-full flex-1 flex min-h-0 flex-col">
      <div className="pl-4 flex items-center justify-between border-b border-stroke-light-ter dark:border-stroke-dark-ter">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Response Body
        </span>

        <div className="flex">
          <Tooltip content="Download file">
            <button
              onClick={handleDownload}
              className="bg-none outline-none border-none text-text-b-sec dark:text-text-w-sec p-2"
            >
              <Download size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Copy Response">
            <button
              onClick={copyResponse}
              className="bg-none outline-none border-none text-text-b-sec dark:text-text-w-sec p-2"
            >
              <Copy size={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <ResponseBodyView type={type} value={data} />
      </div>
    </div>
  );
};

export default ResponseBody;
