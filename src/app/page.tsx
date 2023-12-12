import Image from "next/image";
import { anton } from "./layout";

export default function Home() {
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
