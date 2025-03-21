import React, { useState } from 'react';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/apiSlice';
import { Task } from '../store/apiSlice';
import { Card, CardContent, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const handleSave = () => {
        updateTask({ ...task, title, description })
            .unwrap()
            .then(() => setIsEditing(false));
    };

    const toggleStatus = () => {
        updateTask({ ...task, status: task.status === 'completed' ? 'not-completed' : 'completed' });
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Заголовок"
                            fullWidth
                        />
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Опис"
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <Button onClick={handleSave} variant="contained">
                            Зберегти
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5">
                            {task.title}
                            <IconButton onClick={toggleStatus} color={task.status === 'completed' ? 'success' : 'error'}>
                                {task.status === 'completed' ? <CheckCircleIcon /> : <CancelIcon />}
                            </IconButton>
                        </Typography>
                        <Typography variant="body1">{task.description}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                            <IconButton onClick={() => setIsEditing(true)} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => deleteTask(task.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskItem;