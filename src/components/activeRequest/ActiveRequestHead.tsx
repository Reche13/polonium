import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import ActiveRequestTab from "./ActiveRequestTab";
import { Plus } from "lucide-react";

const ActiveRequestHead = () => {
  const { tabs, addTab } = useRequestTabStore();

  const createNewTab = () => {
    addTab({
      method: "GET",
      title: "Untitled",
      url: "",
      selectedOptionNav: "PARAMS",
      bodyType: "none",
    });
  };
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <ActiveRequestTab
            key={tab.id}
            id={tab.id}
            title={tab.title}
            method={tab.method}
          />
        ))}
      </div>
      {/* ADD TAB */}
      <button
        onClick={createNewTab}
        className="flex items-center justify-center p-1 rounded-sm bg-bg-light-pri hover:bg-bg-light-ter dark:bg-bg-dark-pri dark:hover:bg-bg-dark-ter group"
      >
        <Plus
          size={16}
          className="text-text-b-sec/80 dark:text-text-w-sec/80 group-hover:text-text-b-sec dark:group-hover:text-text-w-sec"
        />
      </button>
    </div>
  );
};

export default ActiveRequestHead;
