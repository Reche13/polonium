type RequestProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  parameters?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
};
