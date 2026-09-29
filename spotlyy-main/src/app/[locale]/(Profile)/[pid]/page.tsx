import { notFound } from "next/navigation";
import React from "react";

export const runtime = "edge";
const page = async ({ params }: { params: Promise<{ pid: string }> }) => {
  // Await the params promise to get the actual value
  const { pid } = await params;
  if (!pid.startsWith("%40")) {
    notFound();
  }
  return <div>page {pid}</div>;
};

export default page;
