import {UUID} from "../types";
import {TaskStatus} from "../../enum/task-status";

export interface ITask {
    id: UUID;
    title: string;
    description: string;
    status: TaskStatus;
}