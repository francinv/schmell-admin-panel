import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import AudioFilesOverview from './AudioFilesOverview';


const AudioFilesComp = ({activeTab, setActiveTab}) => {
    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <AudioFilesOverview />
        </Box>
    );
}

export default AudioFilesComp;
