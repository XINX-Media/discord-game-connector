//import request from 'supertest';
//import server from 'nextjs-http-supertest';

import { GET } from "./route";
import { testClient } from "../../../../utils/test-client";

const request = testClient(GET);

describe("platform model", () => {
  it("should return expected data", async () => {
    const response = await request.get("/api/platform/findMany");
    //console.log(response);
    expect(response.status).toEqual(200);
  })
});

