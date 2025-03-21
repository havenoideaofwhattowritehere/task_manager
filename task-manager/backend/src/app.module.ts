import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import config from "./config";
import {validate} from "./core/config/env.validation";
import {DatabaseModule} from "./core/database/database.module";

@Module({
  imports: [
      TasksModule,
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        load: [() => config],
        isGlobal: true,
        validate,
      }),
      DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
