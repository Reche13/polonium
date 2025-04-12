import React from "react";
import Tooltip from "../primitives/Tooltip";
import { Plus } from "lucide-react";

const Collection = () => {
  return (
    <div className="bg-bg-light-pri dark:bg-bg-dark-pri h-full">
      {/* HEADER */}
      <div className="flex items-center">
        <Tooltip content="Add new collection" delay={500}>
          <div
            role="button"
            className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex gap-2 px-4 py-2"
          >
            <Plus size={16} />
            <span className="text-xs font-medium">New</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Collection;
