## Getting Started

.env requires a `DATABASE_URL` in the following format:

```
mysql://<username>:<password>@localhost:3306/DGC"
```

Prisma:

* run `npx prisma generate` to generate the client for the schema.
* Restart vscode to get the dependency graph to update
* run `npx prisma db push` to actually create the tables

To run the server in dev mode, use `npm run dev`.