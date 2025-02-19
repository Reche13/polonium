import dns from "dns/promises";
import net from "net";
import tls from "tls";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function POST(req: NextRequest) {
  // const { url } = await req.json();

  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const timings = {
    prepare: 0,
    socketInitialization: 0,
    dnsLookup: 0,
    tcpHandshake: 0,
    tlsHandshake: 0,
    transferStart: 0,
    download: 0,
    process: 0,
    total: 0,
  };

  const mainStart = performance.now();

  try {
    const prepareStart = performance.now();
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const protocol = parsedUrl.protocol;
    const path = parsedUrl.pathname || "/";
    const port = parsedUrl.port
      ? parseInt(parsedUrl.port)
      : protocol === "https:"
      ? 443
      : 80;
    timings.prepare = performance.now() - prepareStart;

    // DNS Lookup
    let ipAddress: string;
    const dnsStart = performance.now();
    if (hostname === "localhost") {
      ipAddress = "127.0.0.1";
    } else {
      const address = await dns.lookup(hostname);
      ipAddress = address.address;
    }
    timings.dnsLookup = performance.now() - dnsStart;

    // TCP Connection
    const socketInitStart = performance.now();
    const socket = await new Promise<net.Socket>((resolve, reject) => {
      const s = net.createConnection({ host: ipAddress, port }, () => {
        timings.tcpHandshake = performance.now() - socketInitStart;
        resolve(s);
      });
      s.on("error", reject);
    });

    timings.socketInitialization = performance.now() - socketInitStart;

    // TLS Handshake (if HTTPS)
    let secureSocket = socket;
    if (protocol === "https:") {
      const tlsStart = performance.now();
      secureSocket = tls.connect({ socket, servername: hostname });
      await new Promise<void>((resolve, reject) => {
        secureSocket.once("secureConnect", () => {
          timings.tlsHandshake = performance.now() - tlsStart;
          resolve();
        });
        secureSocket.once("error", reject);
      });
    }

    // HTTP Request
    const httpStart = performance.now();
    const request = [
      `GET ${path} HTTP/1.1`,
      `Host: ${hostname}`,
      `User-Agent: Node.js`,
      `Accept: */*`,
      `Connection: close`,
      `\r\n`,
    ].join("\r\n");

    secureSocket.write(request);

    let firstByteReceived = false;
    let downloadStart = 0;
    let downloadEnd = 0;

    await new Promise((resolve, reject) => {
      secureSocket.on("data", (chunk) => {
        if (!firstByteReceived) {
          downloadStart = performance.now();
          timings.transferStart = downloadStart - httpStart;
          firstByteReceived = true;
        }
      });

      secureSocket.on("end", () => {
        downloadEnd = performance.now();
        timings.download = downloadEnd - downloadStart;
        resolve(null);
      });

      secureSocket.on("error", (err) => reject(err));
    });

    const processStart = performance.now();
    // Simulate processing logic
    const processEnd = performance.now();
    timings.process = processEnd - processStart;

    timings.total = performance.now() - mainStart;

    return NextResponse.json({ timings });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({
      status: "fail",
      error: error.message,
      timings,
    });
  }
}
