type RequestProps = {
  url: string;
  method: Method;
  parameters?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
