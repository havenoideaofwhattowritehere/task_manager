import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

interface FiltersProps {
    filterStatus: 'all' | 'completed' | 'not-completed';
    setFilterStatus: (status: 'all' | 'completed' | 'not-completed') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            <TextField
                select
                label="Фільтр за статусом"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'not-completed')}
                sx={{ minWidth: 200 }}
            >
                <MenuItem value="all">Всі</MenuItem>
                <MenuItem value="completed">Виконані</MenuItem>
                <MenuItem value="not-completed">Не виконані</MenuItem>
            </TextField>
            <TextField
                label="Пошук за назвою або описом"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
            />
        </Box>
    );
};

export default Filters;