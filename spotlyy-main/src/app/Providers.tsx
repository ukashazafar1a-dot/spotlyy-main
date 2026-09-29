import NextTopLoader from "nextjs-toploader";
import React from "react";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <React.Fragment>{children}</React.Fragment>
      <NextTopLoader
        color="#000000"
        height={3}
        showSpinner={false}
        showAtBottom={false}
      />
    </>
  );
}
