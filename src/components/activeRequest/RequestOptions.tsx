import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import RequestOptionsHeader from "./RequestOptionsHeader";
import Parameters from "../requestOptions/Parameters";
import Headers from "../requestOptions/Headers";
import Body from "../requestOptions/Body";

const RequestOptions = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === activeTabId);

  const changeOptionTab = (value: OptionsNav) => {
    editTab(activeTabId, {
      selectedOptionNav: value,
    });
  };

  return (
    <div className="w-full flex flex-col h-full">
      <RequestOptionsHeader
        selectedOptionTab={activeRequest?.selectedOptionNav!!}
        changeOptionTab={changeOptionTab}
      />
      <div className="flex-1 h-0">
        {activeRequest?.selectedOptionNav === "PARAMS" && <Parameters />}
        {activeRequest?.selectedOptionNav === "BODY" && <Body />}
        {activeRequest?.selectedOptionNav === "HEADERS" && <Headers />}
      </div>
    </div>
  );
};

export default RequestOptions;
