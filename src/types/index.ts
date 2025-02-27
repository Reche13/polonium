type RequestProps = {
  url: string;
  method: Method;
  parameters?: Record<string, string>;
  headers?: Record<string, string>;
  body?: string;
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

type OptionsNav = "PARAMS" | "BODY" | "HEADERS" | "AUTH";

type BodyType = "none" | "application/json" | "application/xml" | "text/plain";
