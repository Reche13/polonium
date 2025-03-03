import React from "react";
import ResponseBodyView from "../body/ResponseBodyView";

const ResponseBody = ({
  data,
  type,
}: {
  data: string;
  type: ResponseDataType;
}) => {
  console.log(data, type);
  return (
    <div className="w-full flex-1 overflow-y-auto">
      <ResponseBodyView type={type} value={data} />
    </div>
  );
};

export default ResponseBody;
