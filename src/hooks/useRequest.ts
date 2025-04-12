import { useRequestTabStore } from "@/stores/RequestTabStore";

interface DataInit {
  data?: string | null;
  headers: Record<string, string>;
  url: string;
  method: Method;
}

export default function useRequest(id: string) {
  const { tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === id);

  const generateRequest = async () => {
    if (!activeRequest) return;

    editTab(id, {
      requestState: "PENDING",
    });

    try {
      const {
        method = "GET",
        url = "",
        bodyType: contentType = "none",
        body = "",
        headers = [],
        queryParams = [],
      } = activeRequest;

      const urlObj = new URL(url);
      const params = urlObj.searchParams;

      queryParams.forEach((param) => {
        if (param.value.trim() === "") {
          params.delete(param.key);
        } else {
          params.set(param.key, param.value);
        }
      });

      urlObj.search = params.toString();
      const urlWithParams = urlObj.toString();

      const cleanedHeaders = headers.reduce<Record<string, string>>(
        (acc, header) => {
          if (header.value.trim() && header.active)
            acc[header.key] = header.value;
          return acc;
        },
        {}
      );

      const data: DataInit = {
        url: urlWithParams,
        method,
        headers: { ...cleanedHeaders },
      };

      const methodsWithBody = new Set(["POST", "PUT", "PATCH"]);
      if (methodsWithBody.has(method) && contentType !== "none") {
        data.headers["Content-Type"] = contentType;
        data.data = body;
      }

      console.log(data);

      const res = await fetch("/api/proxy", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const dataFromRes = await res.json();
      if (dataFromRes.status === "REQUEST_FAILED")
        throw new Error("Request Failed: " + dataFromRes.error);

      editTab(id, {
        requestState: "COMPLETE",
        responseData: dataFromRes.data,
        responseDataType: dataFromRes.dataType,
        responseHeaders: dataFromRes.headers,
        responseCookies: dataFromRes.cookies,
        responseSize: dataFromRes.size,
        responseStatus: dataFromRes.status,
        responseStatusText: dataFromRes.statusText,
        responseTime: dataFromRes.timeTaken,
      });
    } catch (error) {
      console.log("ERROR", error);
      editTab(id, {
        requestState: "FAILED",
      });
    }
  };

  return { generateRequest };
}
