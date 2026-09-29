import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default page;
