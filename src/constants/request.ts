export const methodColors = {
  GET: "#10b981",
  POST: "#3b82f6",
  PUT: "#eab308",
  PATCH: "#8b5cf6",
  DELETE: "#f34f5e",
  HEAD: "#14b8a6",
  OPTIONS: "#6366f1",
};

export const methods: Method[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export const bodyTypes: BodyType[] = [
  "none",
  "application/json",
  "application/xml",
  "text/plain",
];

export const requestOptionsNav: {
  label: string;
  OptionsNav: OptionsNav;
}[] = [
  {
    label: "Parameters",
    OptionsNav: "PARAMS",
  },
  {
    label: "Body",
    OptionsNav: "BODY",
  },
  {
    label: "Headers",
    OptionsNav: "HEADERS",
  },
  {
    label: "Authorization",
    OptionsNav: "AUTH",
  },
];
