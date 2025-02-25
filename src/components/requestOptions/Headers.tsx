import React from "react";
import HeadersTable from "../tables/HeadersTable";
import { Plus, Trash2 } from "lucide-react";
import { useRequestTabStore } from "@/stores/RequestTabStore";

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
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-stroke-light-ter dark:border-stroke-dark-ter pl-4">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Headers List
        </span>
        <div className="flex">
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
          <div onClick={addRow} role="button" className="p-2 cursor-pointer">
            <Plus
              size={16}
              className="text-text-b-sec hover:text-text-b-pri dark:text-text-w-sec dark:hover:text-text-w-pri"
            />
          </div>
        </div>
      </div>
      <HeadersTable />
    </div>
  );
};

export default Headers;
