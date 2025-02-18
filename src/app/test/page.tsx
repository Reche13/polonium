"use client";

import { useEffect } from "react";

const Page = () => {
  const url = "http://localhost:8080";
  const testRequest = async () => {
    const res = await fetch("/api/track", {
      method: "POST",
      body: JSON.stringify({
        url,
        method: "GET",
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    testRequest();
  }, []);
  return <div>Page</div>;
};

export default Page;
