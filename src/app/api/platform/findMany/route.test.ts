//import request from 'supertest';
//import server from 'nextjs-http-supertest';

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

import { GET } from "./route";
import { testClient } from "../../../../utils/test-client";

const request = testClient(GET);

describe("platform model", () => {
  it("should return expected data", async () => {
    const response = await request.get("/api/platform/findMany");
    //console.log(response);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({"success":true,"platform":[{"id":"clrbw447i0001j3e6kco9zgvr","external_id":"16"},{"id":"clroijblj0000zfmabimjsclc","external_id":"17"},{"id":"clroj9fth00009tda6xvxgpny","external_id":"15"}]});
  })
});

