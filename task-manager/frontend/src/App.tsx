import React, { useState } from 'react';
import { useGetTasksQuery } from './store/apiSlice';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filters from './components/Filters';
import { Task } from './store/apiSlice';
import { CircularProgress, Alert, Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'not-completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm />
        <Filters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        {isLoading && <CircularProgress />}
        {isError && <Alert severity="error">Помилка при отриманні задач</Alert>}
        <TaskList tasks={filteredTasks} />
      </Container>
  );
};

export default App;