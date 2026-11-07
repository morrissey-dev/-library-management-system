
import "dotenv/config";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionUrl = new URL(process.env.DATABASE_URL!);
    connectionUrl.searchParams.delete("sslmode");

    const adapter = new PrismaPg({
      connectionString: connectionUrl.toString(),
      ssl: {
        ca: readFileSync(
         join(process.cwd(), "certs", "supabase-ca.crt"),
          "utf8",
        ),
        rejectUnauthorized: true,
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
