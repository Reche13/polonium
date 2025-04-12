import { parseCookie } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url, data, method, headers } = await req.json();

  try {
    const startTime = performance.now();
    const response = await fetch(url, {
      headers,
      method,
      body: data,
    });
    const resClone = response.clone();

    const { data: resData, type: resType } = await handleResponse(response);
    const timeTaken = performance.now() - startTime;
    const resHeaders = [...response.headers.entries()].map(([key, value]) => ({
      key,
      value,
    }));

    const cookies = resHeaders
      .filter((h) => h.key.toLowerCase() === "set-cookie")
      .map((h) => parseCookie(h.value));

    const status = response.status;
    const statusText = response.statusText;

    const resBlob = await resClone.blob();

    return NextResponse.json({
      data: resData,
      dataType: resType,
      headers: resHeaders,
      cookies,
      status,
      statusText,
      size: resBlob.size,
      timeTaken,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({
      status: "REQUEST_FAILED",
      error: error.message,
    });
  }
}

async function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  let data: string = "";
  let type: string = "unknown";

  if (!response.ok) {
    // throw new Error(`HTTP Error! Status: ${response.status}`);
    return { data: "{}", type: "JSON" };
  }

  if (contentType) {
    if (contentType.includes("application/json")) {
      const jsonData = await response.json();
      data = JSON.stringify(jsonData, null, 2); // Convert JSON to string with formatting
      type = "JSON";
    } else if (contentType.includes("text/html")) {
      data = await response.text();
      type = "HTML";
    } else if (contentType.includes("text")) {
      data = await response.text();
      type = "TEXT";
    } else if (contentType.includes("xml")) {
      data = await response.text();
      type = "XML";
    } else if (contentType.includes("form")) {
      const formData = await response.formData();
      data = JSON.stringify(Object.fromEntries(formData.entries()), null, 2); // Convert FormData to JSON string
      type = "FORM";
    } else if (
      contentType.includes("octet-stream") ||
      contentType.includes("binary")
    ) {
      const blob = await response.blob();
      data = "[BINARY DATA]"; // Placeholder, since binary data isn't readable as text
      type = "BINARY";
    } else {
      data = await response.text();
      type = "TEXT";
    }
  } else {
    data = await response.text();
    type = "TEXT";
  }

  return { data, type };
}
