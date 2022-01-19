import React, { useState } from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import GameOverview from './GameOverview';
import { WeekOverview } from './WeekOverview';
import { QuestionsOverview } from './QuestionOverview';

const GamesComp = ({activeTab, setActiveTab}) => {
    const [stage, setStage] = useState('G');
    
    if (stage === 'G') {
        return (
            <Box sx={{display:'flex', height: '100vh'}}>
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                <GameOverview setStage={setStage}/>
            </Box>
        );
    } 
    else if (stage === 'W') {
        return (
            <Box sx={{display:'flex', height: '100vh'}}>
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                <WeekOverview setStage={setStage}/>
            </Box> 
        );
    }
    else if (stage === 'Q') {
        return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <QuestionsOverview setStage={setStage}/>
        </Box> 
        );
    }
}

export default GamesComp;
