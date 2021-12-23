import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LogIn from './LogIn';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../features/selectors';
import TasksComp from './Tasks';
import OverviewComp from './Overview';
import IdeasComp from './Ideas';
import GamesComp from './Games';
import SettingsComp from './Settings';
import StatisticsComp from './Statistics';

function App() {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const [activeTab, setActiveTab] = useState('O');

    if (isLoggedIn) {
        if (activeTab === 'O') {
            return <OverviewComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        } else if (activeTab === 'T') {
            return <TasksComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        } else if (activeTab === 'I') {
            return <IdeasComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        } else if (activeTab === 'G') {
            return <GamesComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        } else if (activeTab === 'S') {
            return <StatisticsComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        } else if (activeTab === 'P') {
            return <SettingsComp activeTab={activeTab} setActiveTab={setActiveTab}/>
        }
        
    } else {
        return (
            <LogIn />
        )
    }
}

export default App;
