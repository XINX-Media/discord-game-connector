"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { Preahvihear } from "next/font/google";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/");
  }

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  const [signInLoading, setSignInLoading] = useState(false);

  const handleSignIn = async () => {
    setSignInLoading((prev) => true);
    const response = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
    });

    if (response?.error) {
      console.log("Error signing in");
      router.replace("/");
    } else {
      router.replace("/");
    }
  };

  const searchParams = useSearchParams();

  const unauthorized = searchParams.get("unauthorized");

  return (
    <>
      <main className="flex flex-col min-h-screen h-screen antialiased bg-slate-900">
        <section className="flex items-center justify-center h-full">
          <Card
            className="min-w-[500px] max-w-[500px] px-6 py-12 dark:bg-slate-800"
            isBlurred
          >
            <CardBody className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">Login</h1>
              <div className="flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  isRequired
                  size="lg"
                  value={credentials.email}
                  onChange={handleEmail}
                />
                <Input
                  type="password"
                  label="Password"
                  size="lg"
                  value={credentials.password}
                  onChange={handlePassword}
                />
              </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-center justify-center">
              <Button
                className="w-full text-white text-lg rounded-full"
                color="success"
                isDisabled={credentials.email ? false : true}
                onClick={handleSignIn}
                isLoading={signInLoading}
              >
                Login
              </Button>
              {unauthorized && (
                <p className="text-danger">
                  Looks like that email isn&apos;t registered with us yet. Try
                  again with a different email or create a new account.
                </p>
              )}

              <div className="flex justify-between w-full mt-4">
                {/* <Link href="/sign-up">
                  <span className="text-secondary underline">
                    Forgot Password?
                  </span>
                </Link> */}
                <Link href="/auth/sign-up">
                  <span className="text-warning underline">
                    Create an Account
                  </span>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
};

export default SignIn;
