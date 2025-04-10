import React from "react";
import {
  TooltipProvider,
  Tooltip as TooltipLegacy,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

interface Props {
  content: string;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: Props) => {
  return (
    <TooltipProvider>
      <TooltipLegacy>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipLegacy>
    </TooltipProvider>
  );
};

export default Tooltip;
