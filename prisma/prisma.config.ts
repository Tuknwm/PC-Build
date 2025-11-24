import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasources: {
    db: {
      provider: "sqlite",
      url: "file:./dev.db",
    },
  },
});
