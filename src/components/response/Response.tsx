import React, { useState } from "react";
import ResponseHeader from "./ResponseHeader";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import Spinner from "../primitives/loaders/Spinner";
import ResponseNavigator from "./ResponseNavigator";
import ResponseBody from "./ResponseBody";
import ResponseHeaders from "./ResponseHeaders";
import ResponseCookies from "./ResponseCookies";

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
          {activeRequest.SelectedResponseNav === "PRETTY" && (
            <ResponseBody
              type={activeRequest.responseDataType ?? "TEXT"}
              data={activeRequest.responseData ?? ""}
            />
          )}
          {activeRequest.SelectedResponseNav === "RAW" && (
            <ResponseBody type="TEXT" data={activeRequest.responseData ?? ""} />
          )}
          {activeRequest.SelectedResponseNav === "HEADERS" && (
            <ResponseHeaders headers={activeRequest.responseHeaders ?? []} />
          )}
          {activeRequest.SelectedResponseNav === "COOKIES" && (
            <ResponseCookies cookies={activeRequest.responseCookies ?? []} />
          )}
        </>
      )}

      {activeRequest?.requestState === "NOT_STARTED" && (
        <div className="w-full h-full flex flex-col items-center py-10">
          <span className="mt-8 text-sm font-medium text-text-b-sec dark:text-text-w-sec">
            No Request Made Yet
          </span>
          <p className="text-xs font-normal text-text-b-sec dark:text-text-w-sec">
            Send a request to see the response here.
          </p>
        </div>
      )}
      {activeRequest?.requestState === "FAILED" && (
        <div className="w-full h-full flex flex-col items-center py-10">
          <span className="mt-8 text-sm font-medium text-text-b-sec dark:text-text-w-sec">
            Request Failed
          </span>
          <p className="text-xs font-normal text-text-b-sec dark:text-text-w-sec">
            Check your network or the request URL.
          </p>
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
