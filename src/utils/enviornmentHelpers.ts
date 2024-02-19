import dotenv from "dotenv";
dotenv.config();

export const getNodeEnv = () => {
  return process.env.NODE_ENV;
};

export const isNodeEnv = (mode: typeof process.env.NODE_ENV) => {
  return mode === process.env.NODE_ENV;
};
