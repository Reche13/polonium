import React from "react";
import QueryParamsTable from "../tables/QueryParamsTable";

const Parameters = () => {
  return (
    <div className="w-full">
      <div className="border-b border-stroke-light-ter dark:border-stroke-dark-ter px-4 py-1">
        <span className="text-xs font-medium text-text-b-sec dark:text-text-w-sec">
          Query Parameters
        </span>
      </div>
      <QueryParamsTable />
    </div>
  );
};

export default Parameters;
