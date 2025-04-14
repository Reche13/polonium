import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="mt-8 text-sm font-medium text-text-b-sec dark:text-text-w-sec">
        Coming Soon
      </span>
      <p className="text-xs font-normal text-text-b-sec dark:text-text-w-sec">
        This project is still in development. Support for Websockets and other
        realtime options coming soon.
      </p>
    </div>
  );
};

export default page;
