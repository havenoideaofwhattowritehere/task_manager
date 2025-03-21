import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "./entities/task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UUID} from "../../shared/common/interfaces/types";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {TaskStatus} from "../../shared/common/enum/task-status";

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param('id') id: UUID, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getTask(@Param('id') id: UUID): Promise<Task> {
        return this.taskService.getTask(id);
    }

    @Get(':status')
    @HttpCode(HttpStatus.OK)
    async getTaskByStatus(@Param('status') status: TaskStatus): Promise<Task[]> {
        return this.taskService.getTasksByStatus(status);
    }

    @Get(':title')
    @HttpCode(HttpStatus.OK)
    async getTaskByName(@Param('name') taskName: string) {
        return this.taskService.getTaskByName(taskName);
    }

    @Get(':description')
    @HttpCode(HttpStatus.OK)
    async getTaskByDescription(@Param('description') description: string) {
        return this.taskService.getTaskByDescription(description);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async removeTask(@Param('id') id: UUID) {
        return this.taskService.removeTask(id);
    }
}
