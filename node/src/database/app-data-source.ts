import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/spacex.sql",
  entities: ["./src/entities/**/*{.ts,.js}"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ["./src/database/migrations/**/*{.ts,.js}"],
});
