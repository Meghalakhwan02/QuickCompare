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

## Deployment & DevOps

### Critical: Backend API URL
This project uses Next.js, which means environment variables prefixed with `NEXT_PUBLIC_` are **baked into the static JavaScript bundle at build time**.

If you do not provide the `NEXT_PUBLIC_API_BASE_URL` during the build step, the application will default to `http://localhost:8080`, and the production API calls will fail.

#### Option 1: Docker (Recommended)
When building the Docker image, you **must** pass the backend URL as a build argument:

```bash
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://your-production-backend-url.com -t quick-compare-frontend .
```

#### Option 2: Manual Build
If building manually on a server:

```bash
export NEXT_PUBLIC_API_BASE_URL=http://your-production-backend-url.com
npm run build
npm run start
```

### Summary of Requirements
- **Node.js**: 20+
- **Internal Port**: 3000
- **Environment Variable**: `NEXT_PUBLIC_API_BASE_URL` (Required at Build Time)
