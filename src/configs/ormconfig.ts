import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

const config: ConfigService = new ConfigService();

const getOrmConfig = (config: ConfigService): TypeOrmModuleOptions => {
  return {
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: config.get('DB_SSL'),
    //   },
    // },
    // options: { encrypt: false },
    type: config.get<DatabaseType>(`DB_TYPE`),
    host: config.get(`DB_HOST`),
    port: config.get<number>(`DB_PORT`),
    database: config.get(`DB_NAME`),
    username: config.get(`DB_USERNAME`),
    password: config.get(`DB_PASSWORD`),
    // synchronize: config.get('DB_SYNC'),
    synchronize: true,
    cli: {
      entitiesDir: 'src/**/entities',
      migrationsDir: 'src/resources/migrations',
    },
    autoLoadEntities: false,
    //migrationsRun: true,
    migrations: ['dist/src/resources/migrations/**/*{.ts,.js}'],
    seeds: ['dist/src/resources/seeds/**/*{.ts,.js,.json}'],
    //factories: ['src/resources/factories/**/*{.ts,.js}'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    // logging: true,
    // logger: 'advanced-console',

   cache: {
      type: "database",
      tableName: "configurable-table-query-result-cache",
      //duration: 1000
    }
  } as TypeOrmModuleOptions;
};

export const dbConnectionsConfig = registerAs('DB_CONFIG', () =>
  getOrmConfig(config),
);

export default getOrmConfig(config);
