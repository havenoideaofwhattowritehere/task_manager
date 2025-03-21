import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TasksRepository} from "./tasks.repository";
import {taskProviders} from "./entities/task.entity";

@Module({
  imports: [],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, ...taskProviders]
})
export class TasksModule {}
