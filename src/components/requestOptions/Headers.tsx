import React from "react";
import HeadersTable from "../tables/HeadersTable";
import { Plus, Trash2 } from "lucide-react";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import Tooltip from "../primitives/Tooltip";

const Headers = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);
  const headers = activeTab?.headers || [];

  const addRow = () => {
    headers.push({
      id: crypto.randomUUID(),
      key: "",
      value: "",
      description: "",
      active: true,
    });
    editTab(activeTabId, {
      headers: headers,
    });
  };

  const deleteAllRows = () => {
    editTab(activeTabId, {
      headers: [
        {
          id: crypto.randomUUID(),
          key: "",
          value: "",
          description: "",
          active: true,
        },
      ],
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-stroke-light-ter dark:border-stroke-dark-ter pl-4">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Headers List
        </span>
        <div className="flex">
          <Tooltip content="Clear all" delay={500}>
            <div
              onClick={deleteAllRows}
              role="button"
              className="p-2 cursor-pointer"
            >
              <Trash2
                size={16}
                className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
              />
            </div>
          </Tooltip>
          <Tooltip content="Add new" delay={500}>
            <div onClick={addRow} role="button" className="p-2 cursor-pointer">
              <Plus
                size={16}
                className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-bg-dark-ter/30 dark:scrollbar-thumb-bg-light-ter/30 scrollbar-track-bg-light-sec dark:scrollbar-track-bg-dark-sec">
        <HeadersTable />
      </div>
    </div>
  );
};

export default Headers;
