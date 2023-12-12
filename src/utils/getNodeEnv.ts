import dotenv from "dotenv";

dotenv.config();

export const getNodeEnv = () => {
  return process.env.NODE_ENV || "development";
};
