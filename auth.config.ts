import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Instagram from "next-auth/providers/instagram";
import Resend from "next-auth/providers/resend";

import { env } from "@/env.mjs";
import { sendVerificationRequest } from "@/lib/email";



console.log('G',env.GOOGLE_CLIENT_ID,'G',env.GOOGLE_CLIENT_SECRET, 'R', env.RESEND_API_KEY,'R',env.EMAIL_FROM )

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
     // sendVerificationRequest,
    }),
  ],
} satisfies NextAuthConfig;
