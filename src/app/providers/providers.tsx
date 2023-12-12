"use client";
import { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
