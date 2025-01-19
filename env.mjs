import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    AUTH_SECRET: z.string().min(1),
    AZURE_OPENAI_ENDPOINT: z.string().min(1),
    AZURE_OPENAI_API_KEY: z.string().min(1),
    AZURE_OPENAI_DEPLOYMENT_NAME: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    FACEBOOK_ID: z.string().min(1),
    FACEBOOK_SECRET: z.string().min(1),
    INSTAGRAM_ID:z.string().min(1),
    INSTAGRAM_SECRET: z.string().min(1),
    GITHUB_OAUTH_TOKEN: z.string().min(1).optional(),
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1).optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
    FACEBOOK_REDIRECT_URL: z.string().min(1).optional(),
    INSTAGRAM_REDIRECT_URL: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID: z.string().min(1),
  },
  runtimeEnv: {
    AZURE_OPENAI_ENDPOINT:process.env.AZURE_OPENAI_ENDPOINT,
AZURE_OPENAI_API_KEY:process.env.AZURE_OPENAI_API_KEY,
AZURE_OPENAI_DEPLOYMENT_NAME:process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_OAUTH_TOKEN: process.env.GITHUB_OAUTH_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL:process.env.DIRECT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Stripe
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
      FACEBOOK_ID:process.env.FACEBOOK_ID,
      FACEBOOK_SECRET:process.env.FACEBOOK_SECRET,
      INSTAGRAM_ID:process.env.INSTAGRAM_ID,
      INSTAGRAM_SECRET:process.env.INSTAGRAM_SECRET,
      FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL,
      INSTAGRAM_REDIRECT_URL: process.env.INSTAGRAM_REDIRECT_URL
  },
});
