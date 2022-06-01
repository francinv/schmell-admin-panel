import React, { useEffect, useState } from 'react';
import LogIn from './LogIn';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../features/user/userSelectors';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/theme';
import usePage from '../hooks/usePage';
import { CssBaseline } from '@mui/material';
import { checkIfUserIsLoggedIn } from '../utils/userUtil';
import { setLogIn } from '../features/user/userSlice';
import { useAppDispatch } from '../features/hooks';
import axiosService from '../services/axiosService';

const actionDispatch = (dispatch) => ({
    logIn: (query) => dispatch(setLogIn(query)),
});

function App() {
    const { logIn } = actionDispatch(useAppDispatch());

    const isLoggedIn = useSelector(selectUserIsLoggedIn);

    const [activeTab, setActiveTab] = useState('O');

    useEffect(async () => {
        if (await checkIfUserIsLoggedIn()) {
            logIn(await axiosService.get(`user/${localStorage.getItem('user')}`).then(res => res.data));
        }  else {
            localStorage.removeItem('access');
            localStorage.removeItem('user');
            localStorage.removeItem('refresh');
        }
    }, []);

    if (isLoggedIn) {
        return (
            <ThemeProvider theme={theme}>
                {usePage({activeTab, setActiveTab})}
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LogIn />
            </ThemeProvider>
        );
    }
}

export default App;
