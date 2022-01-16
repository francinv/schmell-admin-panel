import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import { useAppDispatch } from '../../features/hooks';
import { setGames } from '../../features/games/gameSlice';
import { fetchGamesFromServer } from '../../core/APIfunctions';
import GameOverview from './GameOverview';
import { WeekOverview } from './WeekOverview';
import { QuestionsOverview } from './QuestionOverview';

const actionDispatch = (dispatch) => ({
    setGames: (query) => dispatch(setGames(query)),
})

const GamesComp = ({activeTab, setActiveTab}) => {
    const [stage, setStage] = useState('G');
    const { setGames } = actionDispatch(useAppDispatch());

    useEffect(async () => {
        setGames(await fetchGamesFromServer());
    }, []);


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
