export type ParsedCookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  httpOnly: boolean;
  secure: boolean;
};

export const parseCookie = (str: string): ParsedCookie => {
  const parts = str.split(";").map((v) => v.trim().split("="));
  const nameValue = parts.shift() || ["", ""];

  const cookie: ParsedCookie = {
    name: decodeURIComponent(nameValue[0]),
    value: decodeURIComponent(nameValue[1] ?? ""),
    domain: undefined,
    path: undefined,
    expires: undefined,
    httpOnly: false,
    secure: false,
  };

  parts.forEach(([keyRaw, valRaw]) => {
    const key = keyRaw.toLowerCase();
    const val = valRaw ? decodeURIComponent(valRaw) : undefined;

    if (key === "domain") cookie.domain = val;
    else if (key === "path") cookie.path = val;
    else if (key === "expires") cookie.expires = val;
    else if (key === "httponly") cookie.httpOnly = true;
    else if (key === "secure") cookie.secure = true;
  });

  return cookie;
};

export const parseMultipleCookies = (str: string | null): ParsedCookie[] => {
  if (!str) return [];
  return str.split(",").map((v) => parseCookie(v.trim()));
};
