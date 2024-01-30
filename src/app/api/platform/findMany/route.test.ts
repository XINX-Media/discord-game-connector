//import request from 'supertest';
//import server from 'nextjs-http-supertest';

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

import { GET } from "./route";
import { testClient } from "../../../../utils/test-client";

const request = testClient(GET);

describe("platform model", () => {
  it("should return expected data", async () => {
    const response = await request.get('/api/platform/findMany');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({"success":true,"platform":[{"id":"clrbw447i0001j3e6kco9zgvr","external_id":"16"},{"id":"clroijblj0000zfmabimjsclc","external_id":"17"},{"id":"clroj9fth00009tda6xvxgpny","external_id":"15"}]});
  })
});

// test('GET returns expected data', async () => {
//     const response = await request('http://localhost:3000').get('/api/platform/findMany');
//     expect(response.status).toEqual(200);
//     expect(response.body).toEqual({"success":true,"platform":[{"id":"clrbw447i0001j3e6kco9zgvr","external_id":"16"},{"id":"clroijblj0000zfmabimjsclc","external_id":"17"},{"id":"clroj9fth00009tda6xvxgpny","external_id":"15"}]});
//   });

// describe('this will test the findMany function', () => {

//     afterAll(() => {
//         server.close(); 
//     })

//     it('200: Should return an array', async () => {
//         const r = await request(server).get('/api/platform/findMany').query({ offset: 0, limit: 10 });
//         expect(r.statusCode).toEqual(200);
//         expect(r.body.length).toEqual(4);
//     })
// })