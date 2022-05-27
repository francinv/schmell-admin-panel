import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import TasksOverview from './TasksOverview';


const TasksComp = ({activeTab, setActiveTab}) => {
    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <TasksOverview />
        </Box>
    );
}

export default TasksComp;
