import { db } from "@/lib/db";
import { getNodeEnv, isNodeEnv } from "@/utils/enviornmentHelpers";
import {
  EmailUserConfig,
  SendVerificationRequestParams,
} from "next-auth/providers/email";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  const { identifier, url, provider, theme } = params;

  if (isNodeEnv("development")) {
    console.log(`Login Link: ${url}`);
    return;
  }

  const user = await db.user.findUnique({
    where: {
      email: identifier,
    },
  });

  if (!user) {
    throw new Error("No user found");
  }
};

export type EmailProviderProps = EmailUserConfig;

export const emailProviderConfig: EmailProviderProps = {};

if (getNodeEnv() === "development") {
  emailProviderConfig.sendVerificationRequest = sendVerificationRequest;
}
