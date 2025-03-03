import React, { useState } from "react";
import ResponseHeader from "./ResponseHeader";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import Spinner from "../primitives/loaders/Spinner";
import ResponseNavigator from "./ResponseNavigator";
import ResponseBody from "./ResponseBody";
import ResponseHeaders from "./ResponseHeaders";

const Response = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === activeTabId);

  const changeResponseNav = (value: ResponseNav) => {
    editTab(activeTabId, {
      SelectedResponseNav: value,
    });
  };

  return (
    <div className="w-full flex flex-col bg-bg-light-pri dark:bg-bg-dark-pri h-full">
      {activeRequest?.requestState === "COMPLETE" && (
        <>
          <ResponseHeader
            timeTaken={activeRequest?.responseTime ?? 0}
            size={activeRequest?.responseSize ?? 0}
            status={activeRequest?.responseStatus ?? 500}
            statusText={activeRequest?.responseStatusText ?? ""}
          />
          <ResponseNavigator
            selectedNav={activeRequest.SelectedResponseNav}
            changeNav={changeResponseNav}
          />
          {activeRequest.SelectedResponseNav === "PRINT" && (
            <ResponseBody
              type={activeRequest.responseDataType ?? "TEXT"}
              data={activeRequest.responseData ?? ""}
            />
          )}
          {activeRequest.SelectedResponseNav === "RAW" && (
            <ResponseBody
              type="TEXT"
              data={JSON.stringify(activeRequest.responseData, null, 2) ?? ""}
            />
          )}
          {activeRequest.SelectedResponseNav === "HEADERS" && (
            <ResponseHeaders headers={activeRequest.responseHeaders ?? []} />
          )}
        </>
      )}

      {activeRequest?.requestState === "NOT_STARTED" && (
        <div className="w-full h-full flex items-center justify-center py-10">
          not Started
        </div>
      )}
      {activeRequest?.requestState === "FAILED" && (
        <div className="w-full h-full flex items-center justify-center py-10">
          Failed
        </div>
      )}
      {activeRequest?.requestState === "PENDING" && (
        <div className="w-full h-full flex items-center justify-center py-10">
          <Spinner className="text-text-b-sec dark:text-text-w-sec" size={32} />
        </div>
      )}
    </div>
  );
};

export default Response;
