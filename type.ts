declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    DATABASE_URL: string;
    STRIPE_API_KEY: string;
    NEXT_PUBLIC_APP_URL: string;
    STRIPE_WEBHOOK_SECRET: string;
  }
}
