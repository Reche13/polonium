import React from "react";
import QueryParamsTable from "../tables/QueryParamsTable";
import { Plus, Trash2 } from "lucide-react";
import { useRequestTabStore } from "@/stores/RequestTabStore";

const Parameters = () => {
  const { activeTabId, tabs, moveQueryParam, updateQueryParam, editTab } =
    useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);
  const queryParams = activeTab?.queryParams || [];

  const addRow = () => {
    queryParams.push({
      id: crypto.randomUUID(),
      key: "",
      value: "",
      description: "",
      active: true,
    });
    editTab(activeTabId, {
      queryParams: queryParams,
    });
  };

  const deleteAllRows = () => {
    editTab(activeTabId, {
      queryParams: [
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
          Query Parameters
        </span>
        <div className="flex">
          <div
            onClick={deleteAllRows}
            role="button"
            className="p-2 cursor-pointer"
          >
            <Trash2
              size={16}
              className="text-text-b-sec hover:text-text-b-pri"
            />
          </div>
          <div onClick={addRow} role="button" className="p-2 cursor-pointer">
            <Plus size={16} className="text-text-b-sec hover:text-text-b-pri" />
          </div>
        </div>
      </div>
      <QueryParamsTable />
    </div>
  );
};

export default Parameters;
