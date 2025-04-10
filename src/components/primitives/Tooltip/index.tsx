import React from "react";
import {
  TooltipProvider,
  Tooltip as TooltipLegacy,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

interface Props {
  content: string;
  delay?: number;
  children: React.ReactNode;
}

const Tooltip = ({ content, delay = 0, children }: Props) => {
  return (
    <TooltipProvider>
      <TooltipLegacy delayDuration={delay}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipLegacy>
    </TooltipProvider>
  );
};

export default Tooltip;
