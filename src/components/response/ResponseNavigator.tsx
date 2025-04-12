import { cn } from "@/lib/cn";
import React from "react";

interface Props {
  selectedNav: ResponseNav;
  changeNav: (value: ResponseNav) => void;
}

const ResponseNavList: { value: ResponseNav; label: string }[] = [
  { value: "PRETTY", label: "Pretty" },
  { value: "RAW", label: "Raw" },
  { value: "HEADERS", label: "Headers" },
  { value: "COOKIES", label: "Cookies" },
];

const ResponseNavigator = ({ selectedNav, changeNav }: Props) => {
  return (
    <div className="flex shrink-0 w-full border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      {ResponseNavList.map((nav) => (
        <div
          key={nav.value}
          onClick={() => changeNav(nav.value)}
          className={cn(
            "px-4 py-2 text-xs font-medium hover:text-text-b-pri dark:hover:text-text-w-pri bg-bg-light-pri dark:bg-bg-dark-pri relative cursor-pointer select-none",
            selectedNav === nav.value
              ? "text-text-b-pri dark:text-text-w-pri"
              : "text-text-b-sec dark:text-text-w-sec"
          )}
        >
          {nav.label}
          {selectedNav === nav.value && (
            <div className="bg-primary absolute h-[2px] bottom-0 left-4 right-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponseNavigator;
