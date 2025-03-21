import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAddTaskMutation } from '../store/apiSlice';
import { TextField, Button, Box } from '@mui/material';

interface TaskInput {
    title: string;
    description: string;
}

const TaskForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<TaskInput>();
    const [addTask] = useAddTaskMutation();

    const onSubmit: SubmitHandler<TaskInput> = (data) => {
        addTask({ ...data, status: 'not-completed' })
            .unwrap()
            .then(() => reset());
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ marginBottom: 3 }}>
            <TextField
                {...register('title', { required: true })}
                label="Заголовок"
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                {...register('description', { required: true })}
                label="Опис"
                multiline
                rows={3}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained">
                Додати задачу
            </Button>
        </Box>
    );
};

export default TaskForm;