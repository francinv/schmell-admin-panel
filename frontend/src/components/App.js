import React, { useState } from 'react';
import LogIn from './LogIn';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../features/user/userSelectors';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import { useContent } from '../hooks/useContent';

function App() {
    const isLoggedIn = useSelector(selectUserIsLoggedIn);
    const [activeTab, setActiveTab] = useState('O');

    if (isLoggedIn) {
        return (
            <ThemeProvider theme={theme}>
                {useContent({activeTab, setActiveTab})}
            </ThemeProvider>
        );
    } else {
        return (
            <LogIn />
        );
    }
}

export default App;
