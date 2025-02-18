type ParsedCookie = {
  name: string;
  value: string;
  [key: string]: string | boolean | undefined;
};

export const parseCookie = (str: string): ParsedCookie => {
  const parts = str.split(";").map((v) => v.trim().split("="));
  const nameValue = parts.shift() || ["", ""];

  const cookie: ParsedCookie = {
    name: decodeURIComponent(nameValue[0]),
    value: decodeURIComponent(nameValue[1] ?? ""),
  };

  parts.forEach(([key, val]) => {
    if (val === undefined) {
      cookie[key] = true;
    } else {
      cookie[key] = decodeURIComponent(val);
    }
  });

  return cookie;
};

export const parseMultipleCookies = (str: string | null): ParsedCookie[] => {
  if (!str) return [];
  return str.split(",").map((v) => parseCookie(v.trim()));
};
