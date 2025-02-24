import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import RequestOptionsHeader from "./RequestOptionsHeader";
import Parameters from "../requestOptions/Parameters";

const RequestOptions = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === activeTabId);

  const changeOptionTab = (value: OptionsNav) => {
    editTab(activeTabId, {
      selectedOptionNav: value,
    });
  };

  return (
    <div className="w-full">
      <RequestOptionsHeader
        selectedOptionTab={activeRequest?.selectedOptionNav!!}
        changeOptionTab={changeOptionTab}
      />
      {activeRequest?.selectedOptionNav === "PARAMS" && <Parameters />}
    </div>
  );
};

export default RequestOptions;
