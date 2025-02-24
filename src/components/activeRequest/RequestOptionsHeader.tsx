import { requestOptionsNav } from "@/constants/request";
import { cn } from "@/lib/cn";
import React from "react";

interface Props {
  selectedOptionTab: OptionsNav;
  changeOptionTab: (value: OptionsNav) => void;
}

const RequestOptionsHeader = ({
  selectedOptionTab,
  changeOptionTab,
}: Props) => {
  return (
    <div className="flex border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      {requestOptionsNav.map((navItem, index) => (
        <div
          key={index}
          onClick={() => changeOptionTab(navItem.OptionsNav)}
          className={cn(
            "px-4 py-2 text-xs font-medium hover:text-text-b-pri dark:hover:text-text-w-pri bg-bg-light-pri dark:bg-bg-dark-pri relative cursor-pointer select-none",
            selectedOptionTab === navItem.OptionsNav
              ? "text-text-b-pri dark:text-text-w-pri"
              : "text-text-b-sec dark:text-text-w-sec"
          )}
        >
          {navItem.label}
          {selectedOptionTab === navItem.OptionsNav && (
            <div className="bg-primary absolute h-[2px] bottom-0 left-4 right-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestOptionsHeader;
