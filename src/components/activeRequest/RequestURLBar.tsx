import React from "react";
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

const RequestURLBar = () => {
  return (
    <div className="w-full flex gap-2">
      <div className="border border-stroke-light-ter dark:border-stroke-dark-ter rounded-lg flex items-center w-full  bg-bg-light-sec dark:bg-bg-dark-sec">
        <Select defaultValue={methods[0]}>
          <SelectTrigger className="w-[120px] px-4 py-2 border-y-0 border-l-0 rounded-none border-r border-stroke-light-ter dark:border-stroke-dark-ter  text-xs font-semibold flex gap-1 items-center">
            <SelectValue
              placeholder="Method"
              className=" text-text-b-pri dark:text-text-w-pri"
            />
          </SelectTrigger>
          <SelectContent className="bg-bg-light-pri dark:bg-bg-dark-pri border border-stroke-light-ter dark:border-stroke-dark-ter shadow-lg">
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
          placeholder="Enter a URL"
          className="text-xs text-text-b-pri border-none dark:text-text-w-pri px-4 py-2  outline-none w-full"
        />
      </div>
      <Button>Send</Button>
    </div>
  );
};

export default RequestURLBar;
