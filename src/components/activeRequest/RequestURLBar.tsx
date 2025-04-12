import React, { ChangeEvent } from "react";
import { Button } from "../primitives/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../primitives/Select";
import { Input } from "../primitives/Input";
import { methodColors, methods } from "@/constants/request";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import useRequest from "@/hooks/useRequest";
import { toast } from "sonner";

const RequestURLBar = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === activeTabId);

  const { generateRequest } = useRequest(activeTabId);

  const handleSend = () => {
    if (!activeRequest?.url.trim()) {
      toast.error("URL cannot be empty.");
      return;
    }
    generateRequest();
  };

  const handleMethodChange = (value: Method) => {
    editTab(activeTabId, {
      method: value,
    });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    editTab(activeTabId, {
      url: e.target.value,
    });
  };

  return (
    <div className="w-full flex gap-2 p-4">
      <div className="border border-stroke-light-ter dark:border-stroke-dark-ter rounded-lg flex items-center w-full  bg-bg-light-sec dark:bg-bg-dark-sec overflow-hidden">
        <Select
          value={activeRequest?.method}
          onValueChange={handleMethodChange}
        >
          <SelectTrigger className="w-[120px] px-4 py-2 border-y-0 border-l-0 rounded-none border-r border-stroke-light-ter dark:border-stroke-dark-ter  text-xs font-semibold flex gap-1 items-center">
            <SelectValue
              placeholder="Method"
              className=" text-text-b-pri dark:text-text-w-pri"
            />
          </SelectTrigger>
          <SelectContent className="bg-bg-light-pri dark:bg-bg-dark-pri border-0 h-full border-stroke-light-ter dark:border-stroke-dark-ter shadow-lg">
            {methods.map((method, index) => (
              <SelectItem
                style={{ color: methodColors[method] }}
                key={index}
                value={method}
                className="hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec text-xs font-medium"
              >
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* INPUT */}
        <Input
          type="text"
          value={activeRequest?.url}
          onChange={handleUrlChange}
          placeholder="Enter a URL"
          className="text-xs text-text-b-pri border-none rounded-l-none bg-transparent h-full dark:text-text-w-pri px-4 py-2  outline-none w-full"
        />
      </div>
      <Button onClick={handleSend}>Send</Button>
      <Button variant="seconodary">Save</Button>
    </div>
  );
};

export default RequestURLBar;
