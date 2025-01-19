import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Prisma, PrismaClient } from "@prisma/client";
import ws from "ws";

import { env } from "@/env.mjs";

import "server-only";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

interface ExtendedPrismaClientOptions extends Prisma.PrismaClientOptions {
  adapter?: any;
}

neonConfig.webSocketConstructor = ws;
const connectionString = `${env.DATABASE_URL}`;

export let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  prisma = new PrismaClient({
    adapter,
  } as ExtendedPrismaClientOptions);
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
