import { toast } from "sonner";
import xmlFormatter from "xml-formatter";

export const formatBodyContent = (
  value: string,
  type: ResponseDataType | BodyType = "TEXT"
) => {
  try {
    if (type === "JSON" || type === "application/json") {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
    if (type === "HTML" || type === "XML" || type === "application/xml") {
      const isHtml = type === "HTML";
      const content = isHtml
        ? new DOMParser().parseFromString(value, "text/html").documentElement
            .outerHTML
        : value;

      // Serialize back to string for formatting
      const formattedHtml = xmlFormatter(content, {
        indentation: "  ",
        collapseContent: true,
      });

      return formattedHtml;
    }
    return value;
  } catch (error) {
    console.error("Formatting error:", error);
    toast.error(
      "Could not prettify and invalid body, solve syxtax errors and try again"
    );
    return value;
  }
};
