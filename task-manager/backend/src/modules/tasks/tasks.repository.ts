import {Inject, Injectable} from "@nestjs/common";
import {REPOSITORIES} from "../../shared/helpers/repositories";
import {Task} from "./entities/task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {TASK_INCLUDE} from "./entities/task.include";
import {Transaction} from "typeorm";
import {TaskStatus} from "../../shared/common/enum/task-status";

@Injectable()
export class TasksRepository {
    constructor(@Inject(REPOSITORIES.TASK) private tasksRepository: typeof Task) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.create<Task>(
            {
                ...createTaskDto,
            },
            { include: TASK_INCLUDE.create()},
        );
    }

    async bulkCreate(payload: CreateTaskDto[]): Promise<Task[]> {
        return this.tasksRepository.bulkCreate(payload, {
            include: TASK_INCLUDE.create(),
        });
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.tasksRepository.update(updateTaskDto, {where: { id }});
        return Boolean(task[0]);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.findAll({
            include: TASK_INCLUDE.getAll(),
        });
    }

    async findOne(id: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where:{id},
            include: TASK_INCLUDE.getOne(),
        })
    }

    async findByName(taskName: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where:{title: taskName},
            include: TASK_INCLUDE.getOne(),
        });
    }

    async findByDescription(taskDescription: string): Promise<Task> {
       return this.tasksRepository.findOne({
            where:{description: taskDescription},
            include: TASK_INCLUDE.getOne()
        });
    }

    async findByStatus(status: TaskStatus): Promise<Task[]> {
        return this.tasksRepository.findAll({
            where:{status},
            include: TASK_INCLUDE.getAll(),
        })
    }

    async deleteTask(id: string) : Promise<Boolean> {
        const task = await this.tasksRepository.destroy({
            where: { id },
        });
        return Boolean(task[0]);
    }

    async deleteTaskByName(taskName: string) {
        const task = await this.tasksRepository.destroy({where:{title: taskName}});
        return Boolean(task[0]);
    }


}