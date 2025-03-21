import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksRepository} from "./tasks.repository";
import {Task} from "./entities/task.entity";
import {ErrorMap} from "../../shared/common/utils/response/error.map";
import {UUID} from "../../shared/common/interfaces/types";
import {TaskStatus} from "../../shared/common/enum/task-status";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(private readonly taskRepository: TasksRepository) {}

    async createTask(createTaskDto: CreateTaskDto) {
        try {
            const task = await this.taskRepository.create(createTaskDto);
            this.logger.log("Created task", task);
            return task;
        } catch (error) {
            this.logger.error("Error:", error);
            throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
        }
    }

    async updateTask(id: UUID, updateTaskDto: UpdateTaskDto) {
        const task = await this.taskRepository.updateTask(id, updateTaskDto);
        return Boolean(task[0]);
    }

    async getTasks(): Promise<Task[]> {
        const tasks = await this.taskRepository.findAll();
        if (!tasks) {
            throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
        }
        return tasks;
    }

    async getTask(id: UUID): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
        }
        return task;
    }

    async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
        const tasks = await this.taskRepository.findByStatus(status);
        if (!tasks) {
            throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
        }
        return tasks;
    }

    async getTaskByName(taskName: string) {
        const task = await this.taskRepository.findByName(taskName);
        if (!task) {
            throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
        }
        return task;
    }

    async getTaskByDescription(taskDescription: string) {
        const task = await this.taskRepository.findByDescription(taskDescription);
        if (!task) {
            throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
        }
        return task;
    }

    async removeTask(taskName: string) {
        const task = await this.taskRepository.deleteTaskByName(taskName);
        return Boolean(task[0]);
    }
}
