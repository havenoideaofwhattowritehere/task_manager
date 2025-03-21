import {Column, Default, Model, PrimaryKey, DataType, Table} from "sequelize-typescript";
import {ITask} from "../../../shared/common/interfaces/models/task.interface";
import {TaskStatus} from "../../../shared/common/enum/task-status";
import {REPOSITORIES} from "../../../shared/helpers/repositories";
import {v4} from 'uuid';
import sequelize from "sequelize";
import {UUID} from "../../../shared/common/interfaces/types";
import {ApiProperty} from "@nestjs/swagger";

@Table({ tableName: 'tasks'})
export class Task extends Model<Task> implements ITask {
    @PrimaryKey
    @ApiProperty()
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.ENUM('completed', 'not-completed'))
    status: TaskStatus;
}

export const taskProviders = [
    {
        provide: REPOSITORIES.TASK,
        useValue: Task,
        sequelize,
        modelName: 'Tasks',
        hooks: {
            beforeCreate:(entity: Task) => {
                entity.id = v4();
            }
        }
    }
]