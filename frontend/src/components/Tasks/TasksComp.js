import React from 'react';
import { Box, Typography } from '@mui/material';
import SideBar from '../SideBar';
import { HeaderContainer } from '../layout/content_header/header';
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
