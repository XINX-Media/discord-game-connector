import request from 'supertest';
import { createServer, RequestListener } from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/server/api-utils/node/api-resolver";
import { NextRequest, NextResponse } from 'next/server';

export const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      undefined,
      handler,
      {
        previewModeEncryptionKey: "",
        previewModeId: "",
        previewModeSigningKey: "",
      },
      false
    );
  };

  return request(createServer(listener));
};

// export const testClient = (handler: NextApiHandler) => {
//   const listener: RequestListener = (req, res) => {
//     return apiResolver(
//       req,
//       res,
//       undefined,
//       handler,
//       {
//         previewModeEncryptionKey: "",
//         previewModeId: "",
//         previewModeSigningKey: "",
//       },
//       false
//     );
//   };

//   return createServer(listener);
// };