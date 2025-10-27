import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ['dist/resources/migrations/**/*{.ts,.js}'],
  synchronize: false,
});