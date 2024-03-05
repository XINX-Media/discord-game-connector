"use client";
import Image from "next/image";
import { anton } from "./layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (session.status === "authenticated") {
    return (
      <>
        <main >
          <h1 className={`text-7xl text-warning-500 text-center pt-10 ${anton.className}`}>Welcome To The</h1>
          <div className="flex justify-center items-center min-h-full h-full dark:bg-background">
          <h2
            className={`text-[20rem] glow bg-success-500 text-transparent bg-clip-text ${anton.className}`}
          >
            D
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              iscord
            </span>
            G
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              ame
            </span>
            C
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              onnector
            </span>
          </h2>
          </div>
          
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="flex justify-center items-center min-h-full h-full dark:bg-background">
          <h1
            className={`text-[20rem] glow bg-success-500 text-transparent bg-clip-text ${anton.className}`}
          >
            D
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              iscord
            </span>
            G
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              ame
            </span>
            C
            <span className={`text-6xl text-warning-500 ${anton.className}`}>
              onnector
            </span>
          </h1>
        </main>
      </>
    );
  }
}