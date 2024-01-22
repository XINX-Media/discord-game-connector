import { rest } from 'msw';

export const handlers = [
    rest.get('/platform', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "id": "1",
                    "external_id": "15"
                },
                {
                    "id": "2",
                    "external_id": "20"
                }
            ]),
        )
    }),
    //put other crud operations here
]