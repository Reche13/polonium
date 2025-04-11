export const getMimeType = (type: ResponseDataType) => {
  switch (type) {
    case "JSON":
      return { mime: "application/json", ext: "json" };
    case "HTML":
      return { mime: "text/html", ext: "html" };
    case "XML":
      return { mime: "application/xml", ext: "xml" };
    case "BINARY":
      return { mime: "application/octet-stream", ext: "bin" };
    case "TEXT":
      return { mime: "text/plain", ext: "txt" };
    default:
      return { mime: "text/plain", ext: "txt" };
  }
};
