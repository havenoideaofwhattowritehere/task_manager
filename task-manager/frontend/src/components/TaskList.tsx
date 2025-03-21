import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../store/apiSlice';
import { List } from '@mui/material';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <List>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </List>
    );
};

export default TaskList;