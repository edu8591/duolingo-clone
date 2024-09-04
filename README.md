This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies.

```bash
pnpm i

```

Second, create a .env.local file in the root of the project and add copy the values from the .env.example.

Third, run the migrations with seeds with: development server:
```bash
pnpm db:push

```

Fourth, run the seeds with:

```bash
pnpm db:seed

```

Fifth,(optional) to test payments and subscriptions install the [stripe cli](https://docs.stripe.com/stripe-cli), then run the following:
  ```bash
  stripe login
  pnpm stripe:start
  ```

Sixth, ren dev server
  ```bash
  pnpm dev
  ```




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

