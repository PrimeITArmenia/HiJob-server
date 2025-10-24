import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {dbConnectionsConfig} from "./configs/ormconfig";
import {DatabaseModule} from "@modules/database/database.module";
import {SubscriptionModule} from "@modules/subscription/subscription.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
      load: [dbConnectionsConfig],
    }),

    DatabaseModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
