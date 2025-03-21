import { UUID } from "src/shared/common/interfaces/types";
import {TaskStatus} from "../../../shared/common/enum/task-status";
import {IsEnum, IsString} from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}