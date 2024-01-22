import request from 'supertest';
import server from 'nextjs-http-supertest';

describe('this will test the findMany function', () => {

    afterAll(() => {
        server.close(); 
    })

    it('200: Should return an array', async () => {
        const r = await request(server).get('/api/platform/findMany').query({ offset: 0, limit: 10 });
        expect(r.statusCode).toEqual(200);
        expect(r.body.length).toEqual(4);
    })
})