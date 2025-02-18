"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">(
    "POST"
  );

  const [response, setResponse] = useState<any>(null);

  const handleClick = async () => {};

  return (
    <div className="">
      <h1 className="text-4xl font-bold">POLONIUM</h1>
      <select
        onChange={(e) =>
          setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")
        }
        value={method}
      >
        <option value="POST">POST</option>
        <option value="GET">GET</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} />
      <button onClick={handleClick}>SEND</button>
      {response?.data && (
        <div className="">{JSON.stringify(response.data)}</div>
      )}
      <br />
      <br />
      <br />
      <br />
      {response?.response && (
        <div className="">{JSON.stringify(response.response)}</div>
      )}
    </div>
  );
}
