This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Persistent database

The application uses Neon PostgreSQL for persistent data and encrypted file storage. Set `DATABASE_URL` to the connection string from your Neon project and set `FLEXIPAY_DATA_ENCRYPTION_KEY` to the same 64-character hexadecimal key used by the local database. Configure both as environment variables in Vercel; do not commit them or share them in chat.

To migrate the local SQLite database and its profile photos and credit-application documents into an empty Neon database, configure those two variables locally and run:

```bash
npm run db:migrate-neon
```

The migration reads `data/flexipay.db` and its associated files, encrypts profile photos with the configured data key, and rolls back database changes if a non-catalog source row conflicts with existing Neon data. It reports row counts without displaying record contents. Confirm those counts before directing production traffic to the new database.
