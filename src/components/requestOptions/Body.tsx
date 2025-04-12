import React, { useRef } from "react";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../primitives/Select";
import { bodyTypes } from "@/constants/request";
import BodyEditor from "../body/BodyEditor";
import { FilePlus, Trash2, Wand2 } from "lucide-react";
import Tooltip from "../primitives/Tooltip";
import { formatBodyContent } from "../body/formatBody";

const Body = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleBodyTypeChange = (value: BodyType) => {
    editTab(activeTabId, {
      bodyType: value,
    });
  };

  const handleBodyChange = (value: string) => {
    editTab(activeTabId, {
      body: value,
    });
  };

  const clearBody = () => {
    editTab(activeTabId, {
      body: "",
    });
  };

  const formatBody = () => {
    editTab(activeTabId, {
      body: formatBodyContent(activeTab?.body ?? "", activeTab?.bodyType),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      editTab(activeTabId, {
        body: text,
      });
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-4 border-b border-stroke-light-ter dark:border-stroke-dark-ter pl-4">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Content Type
        </span>
        {/* SELECT */}
        <Select
          value={activeTab?.bodyType}
          onValueChange={handleBodyTypeChange}
        >
          <SelectTrigger className="py-2 px-4 h-fit w-fit border-0 rounded-none border-stroke-light-ter dark:border-stroke-dark-ter  text-xs font-semibold text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri flex gap-1 items-center">
            <SelectValue
              placeholder="Type"
              className=" text-text-b-pri dark:text-text-w-pri"
            />
          </SelectTrigger>

          <SelectContent className="bg-bg-light-pri dark:bg-bg-dark-pri border border-stroke-light-ter dark:border-stroke-dark-ter shadow-lg">
            {bodyTypes.map((type) => (
              <SelectItem
                key={type}
                value={type}
                className="hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec text-xs font-medium"
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex"></div>
      </div>

      {/* BODY OPTIONS */}
      {activeTab?.bodyType !== "none" && (
        <div className="flex items-center justify-between border-b border-stroke-light-ter dark:border-stroke-dark-ter pl-4">
          <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
            Raw Request Body
          </span>
          <div className="flex items-center">
            <Tooltip content="Clear" delay={500}>
              <div
                role="button"
                onClick={clearBody}
                className="p-2 cursor-pointer"
              >
                <Trash2
                  size={16}
                  className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
                />
              </div>
            </Tooltip>

            <Tooltip content="Prettify" delay={500}>
              <div
                role="button"
                onClick={formatBody}
                className="p-2 cursor-pointer"
              >
                <Wand2
                  size={16}
                  className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
                />
              </div>
            </Tooltip>

            <Tooltip content="Import file" delay={500}>
              <>
                <div
                  role="button"
                  onClick={handleImport}
                  className="p-2 cursor-pointer"
                >
                  <FilePlus
                    size={16}
                    className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
                  />
                </div>
                <input
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            </Tooltip>
          </div>
        </div>
      )}

      {/* BODY */}
      <div className="flex-1 overflow-y-auto">
        {activeTab?.bodyType === "none" ? (
          <div className="w-full h-full flex flex-col items-center">
            <span className="mt-8 text-sm font-medium text-text-b-sec dark:text-text-w-sec">
              No Body
            </span>
            <p className="text-xs font-normal text-text-b-sec dark:text-text-w-sec">
              This request does not have a body.
            </p>
          </div>
        ) : (
          <>
            {/* <div className="">hello</div> */}
            <BodyEditor
              value={activeTab?.body ?? ""}
              onChange={handleBodyChange}
              type={activeTab?.bodyType}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
