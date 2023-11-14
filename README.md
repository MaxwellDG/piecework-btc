## In Development - Not Ready for Production. Todo list:

-   UI responsivity for edge screen sizes (i.e. mobile in landscape mode, or skinny tablets, 320px width?)
-   The latter stages of task completion after a Piecework-BTC super admin has accepted a task
-   Admin dashboard should show more updates for when a project / task has been created / updated
-   More 'info' buttons to explain what certain things mean
-   Modals are kinda ugly atm

## Getting Started

.env and .env.local files must be populated. Their contents can be found in the .env.dist and .env.local.dist files respectively.

Once an .env file has been populated correctly with MongoDB related information, run the command 'node scripts/seed.js' from the root directory. This will seed the database with the necessary data for development.

Once an .env.local file has been populated correctly, run the command 'yarn' (you must have yarn installed on your local) to install all dependencies.

# Migrations

If you are returning to this project and want to update your database, run the command 'node migrations/m_1.ts' from the root directory. This will update your database with the latest schemas.

Then you may run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
