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
import { Eye, EyeOff } from "lucide-react";

interface UserDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    confirmPassword: string;
  };
  setUserData: Dispatch<SetStateAction<UserDataProps>>;
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const SignUpForm = ({ userData, setUserData, errors }: SignUpFormProps) => {
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
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
            errorMessage={errors.firstName}
          />
          <Input
            name="lastName"
            type="text"
            label="Last Name"
            isRequired
            size="lg"
            value={userData.lastName}
            onChange={handleForm}
            errorMessage={errors.lastName}
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
          errorMessage={errors.email}
        />
        <Input
          name="password"
          type={passwordVisible ? "text" : "password"}
          label="Password"
          isRequired
          size="lg"
          value={userData.password}
          onChange={handleForm}
          errorMessage={errors.password}
          endContent={
            passwordVisible ? (
              <EyeOff
                onClick={togglePasswordVisible}
                className="cursor-pointer"
              />
            ) : (
              <Eye onClick={togglePasswordVisible} className="cursor-pointer" />
            )
          }
        />
        <Input
          name="confirmPassword"
          type={passwordVisible ? "text" : "password"}
          label="Confirm Password"
          isRequired
          size="lg"
          value={userData.confirmPassword}
          onChange={handleForm}
          errorMessage={errors.confirmPassword}
          endContent={
            passwordVisible ? (
              <EyeOff
                onClick={togglePasswordVisible}
                className="cursor-pointer"
              />
            ) : (
              <Eye onClick={togglePasswordVisible} className="cursor-pointer" />
            )
          }
        />
      </form>
    </>
  );
};

const SignUp = () => {
  const { status } = useSession();
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
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetErrors = () => {
    setErrors({
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

  const handleSignIn = async () => {
    setSignInLoading((prev) => true);
    await signIn("credentials", {
      email: userData.email,
      password: userData.password,
    });
    setSignInLoading((prev) => false);
  };

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleConfetti = () => {
    const count = 200;
    const defaults = {
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
    resetErrors();

    if (
      !(
        userData.confirmPassword &&
        userData.email &&
        userData.firstName &&
        userData.lastName &&
        userData.password
      )
    ) {
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrors((prev) => {
        return {
          ...prev,
          confirmPassword: "Passwords do not match",
        };
      });
      return;
    }

    setSignUpLoading((prev) => true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    setSignUpLoading((prev) => false);

    const status = await response.json();

    if (response.ok) {
      handleConfetti();
      setSignUpSuccess(true);
      setTimeout(async () => {
        await handleSignIn();
      }, 2000);
    } else {
      if (status.error === "Email already registered") {
        setErrors((prev) => {
          return {
            ...prev,
            email: "Email already registered.",
          };
        });
      }
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
                <SignUpForm
                  userData={userData}
                  setUserData={setUserData}
                  errors={errors}
                />
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
                  <Link href="/auth/sign-in">
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
