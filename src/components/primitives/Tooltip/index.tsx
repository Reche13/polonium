// Tooltip.tsx
import { cn } from "@/lib/cn";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const showTooltip = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 16,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setVisible(true);
  };

  const hideTooltip = () => setVisible(false);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </span>
      {ReactDOM.createPortal(
        <div
          className={cn(
            "absolute z-50 px-2 py-1.5 text-[10px] font-semibold text-text-w-pri dark:text-text-b-pri bg-bg-dark-pri dark:bg-bg-light-pri rounded pointer-events-none whitespace-nowrap transform -translate-x-1/2 -translate-y-full transition-all duration-300 ease-in-out",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{
            top: coords.top,
            left: coords.left,
            position: "absolute",
          }}
        >
          <span className="bg-bg-dark-pri dark:bg-bg-light-pri absolute z-30 w-3 h-3 rounded rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
          {content}
        </div>,
        document.body
      )}
    </>
  );
};
