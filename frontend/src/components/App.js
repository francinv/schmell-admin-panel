import React, { useState } from 'react';
import LogIn from './LogIn';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../features/user/userSelectors';
import TasksComp from './Tasks/TasksComp';
import OverviewComp from './Overview/OverviewComp';
import IdeasComp from './Ideas/IdeasComp';
import GamesComp from './Games/GameComponent';
import SettingsComp from './Settings';
import StatisticsComp from './Statistics';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { nbNO } from '@mui/material/locale';

function App() {

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Quicksand',
                
            ].join(','),
            fontSize: 14,
        },
        nbNO,
    });
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const [activeTab, setActiveTab] = useState('O');

    if (isLoggedIn) {
        if (activeTab === 'O') {
            return (<ThemeProvider theme={theme}><OverviewComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        } else if (activeTab === 'T') {
            return (<ThemeProvider theme={theme}><TasksComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        } else if (activeTab === 'I') {
            return (<ThemeProvider theme={theme}><IdeasComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        } else if (activeTab === 'G') {
            return (<ThemeProvider theme={theme}><GamesComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        } else if (activeTab === 'S') {
            return (<ThemeProvider theme={theme}><StatisticsComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        } else if (activeTab === 'P') {
            return (<ThemeProvider theme={theme}><SettingsComp activeTab={activeTab} setActiveTab={setActiveTab}/></ThemeProvider>)
        }
    } else {
        return (
            <LogIn />
        )
    }
}

export default App;
