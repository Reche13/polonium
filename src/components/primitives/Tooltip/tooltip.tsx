"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/cn";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipTrigger = TooltipPrimitive.Trigger;

const Tooltip = ({ children, ...props }: TooltipPrimitive.TooltipProps) => (
  <TooltipPrimitive.Root delayDuration={0} {...props}>
    {children}
  </TooltipPrimitive.Root>
);

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 relative px-2 py-1.5 text-[10px] font-semibold text-text-w-pri dark:text-text-b-pri bg-bg-dark-pri dark:bg-bg-light-pri rounded delay-75 transition-opacity",
        className
      )}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow asChild>
        <div className="w-[10px] h-[10px] relative z-10 rotate-45 -translate-y-[6px] rounded-sm bg-bg-dark-pri dark:bg-bg-light-pri" />
      </TooltipPrimitive.Arrow>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
