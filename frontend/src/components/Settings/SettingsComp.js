import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import SettingsOverview from './SettingsOverview';


const SettingsComponent = ({activeTab, setActiveTab}) => {
    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SettingsOverview />
        </Box>
    );
}

export default SettingsComponent;