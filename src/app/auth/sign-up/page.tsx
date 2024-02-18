"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";

import Link from "next/link";

import confetti from "canvas-confetti";
import { Dispatch, SetStateAction, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface VerificationEmailProps {
  userData: UserDataProps;
}

const VerificationEmail = ({ userData }: VerificationEmailProps) => {
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading((prev) => true);
    await signIn("email", {
      email: userData.email,
      redirect: false,
    });
    setLoading((prev) => false);
  };

  return (
    <>
      <h2 className="text-4xl font-bold text-default-700">Verify Your Email</h2>
      <p className="text-lg text-default-500">
        We have sent an email to{" "}
        <span className="text-success-500">{userData.email}</span>.
      </p>
      <p className="text-lg text-default-500">
        You need to verify your email to continue. If you have not recieved the
        email, try checking your spam folder or click the button below to have
        another email sent to you.
      </p>
      <Button
        className={"mt-4"}
        color="success"
        onClick={handleResend}
        isLoading={loading}
      >
        Resend
      </Button>
    </>
  );
};

interface SignUpFormProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  setUserData: Dispatch<SetStateAction<UserDataProps>>;
}

const SignUpForm = ({ userData, setUserData }: SignUpFormProps) => {
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
      <h1 className="text-xl font-bold text-default-700">Sign Up</h1>
      <form className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          <Input
            name="firstName"
            type="text"
            label="First Name"
            isRequired
            size="lg"
            value={userData.firstName}
            onChange={handleForm}
          />
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            isRequired
            size="lg"
            value={userData.lastName}
            onChange={handleForm}
          />
        </div>
        <Input
          name="email"
          type="email"
          label="Email"
          isRequired
          size="lg"
          value={userData.email}
          onChange={handleForm}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          isRequired
          size="lg"
          value={userData.password}
          onChange={handleForm}
        />
      </form>
    </>
  );
};

const SignUp = () => {
  const { data, status } = useSession();
  const router = useRouter();

  // Redirects user to home page if already logged in.
  if (status === "authenticated") {
    router.push("/");
  }

  const [signInLoading, setSignInLoading] = useState(false);

  const [userData, setUserData] = useState<UserDataProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    setSignInLoading((prev) => true);
    await signIn("email", {
      email: userData.email,
      redirect: false,
    });
    setSignInLoading((prev) => false);
  };

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleConfetti = () => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: Record<string, number>) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      return;
    }

    setSignUpLoading((prev) => true);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    setSignUpLoading((prev) => false);

    const status = await response.json();

    if (status.success) {
      handleConfetti();
      setSignUpSuccess(true);
      //   await handleSignIn();
    } else {
    }
  };

  return (
    <>
      <main className="flex flex-col h-full antialiased bg-slate-900">
        <section className="flex items-center justify-center h-full">
          <Card
            className="min-w-[400px] max-w-xl py-12 px-6 dark:bg-slate-800"
            isBlurred
          >
            {/* <CardHeader className="text-2xl">Sign Up</CardHeader> */}
            <CardBody className="flex flex-col gap-4">
              {!signUpSuccess ? (
                <SignUpForm userData={userData} setUserData={setUserData} />
              ) : (
                <VerificationEmail userData={userData} />
              )}
            </CardBody>
            {!signUpSuccess && (
              <CardFooter className="flex flex-col gap-2 items-center justify-center mt-10">
                <Button
                  className="w-full text-lg rounded-full"
                  onClick={handleSubmit}
                  isLoading={signUpLoading}
                  color={"success"}
                >
                  Create Account
                </Button>
                <div className="text-center">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="uppercase text-warning font-bold">
                      Login
                    </span>
                  </Link>
                </div>
              </CardFooter>
            )}
          </Card>
        </section>
      </main>
    </>
  );
};

export default SignUp;
