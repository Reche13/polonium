import { NextRequest, NextResponse } from "next/server";
import { parseMultipleCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const start = performance.now();

  let options: any = {
    method: body.method,
  };

  if (body.headers) {
    options.headers = body.headers;
  }
  if (body.body) {
    options.body = body.body;
  }

  const response = await fetch(body?.url, options);

  const cookies = response.headers.get("set-cookie");

  if (response.status >= 400) {
    return NextResponse.json({
      status: response.status,
      timeTaken: (performance.now() - start).toFixed(1),
      headers: response.headers,
      cookies: parseMultipleCookies(cookies),
    });
  }

  const data = await response.json();

  return NextResponse.json({
    status: response.status,
    timeTaken: (performance.now() - start).toFixed(1),
    headers: response.headers,
    data: data,
    cookies: parseMultipleCookies(cookies),
  });
}
