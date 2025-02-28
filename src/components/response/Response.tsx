import React from "react";
import ResponseHeader from "./ResponseHeader";

const Response = () => {
  return (
    <div className="w-full bg-bg-light-pri dark:bg-bg-dark-pri">
      <ResponseHeader />
      <div className="">res body</div>
    </div>
  );
};

export default Response;
