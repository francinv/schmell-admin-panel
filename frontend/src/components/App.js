import React, { useState } from 'react';
import LogIn from './LogIn';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../features/user/userSelectors';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import usePage from '../hooks/usePage';

function App() {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const [activeTab, setActiveTab] = useState('O');

    if (isLoggedIn) {
        return (
            <ThemeProvider theme={theme}>
                {usePage({activeTab, setActiveTab})}
            </ThemeProvider>
        );
    } else {
        return (
            <LogIn />
        );
    }
}

export default App;
