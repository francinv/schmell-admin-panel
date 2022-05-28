import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import { HeaderContainer } from '../layout/content_header/header';
import { useSelector } from 'react-redux';
import { fetchQuestions } from '../../features/questions/questionSlice';
import { useAppDispatch } from '../../features/hooks';
import { fetchUsers } from '../../features/user/userSlice';
import { fetchGames } from '../../features/games/gameSlice';
import HeaderCards from './HeaderCards';
import { selectStatisticStatus } from '../../features/statistics/statisticSelectors';
import { fetchStatistics } from '../../features/statistics/statisticSlice';
import DayStatistics from './DayStatistics';
import TaskOverviewSection from './TaskOverviewSection';
import ContentWrapper from '../layout/ContentWrapper';

const actionDispatch = (dispatch) => ({
    fetchGames: () => dispatch(fetchGames()),
    fetchStatistics: () => dispatch(fetchStatistics())
})

const OverviewComp = (setActiveTab) => {
    const staticsStatus = useSelector(selectStatisticStatus);
    const { fetchStatistics } = actionDispatch(useAppDispatch());
    const { fetchGames } = actionDispatch(useAppDispatch());
    
    useEffect(() => {
        if (staticsStatus === 'idle') {
            fetchGames();
            fetchStatistics();
        }
    }, [staticsStatus])

    return (
        <ContentWrapper pageTitle="Oversikt">
            <HeaderCards /> 
            <DayStatistics /> 
            <TaskOverviewSection setActiveTab={setActiveTab} />
        </ContentWrapper>
    );
}

export default OverviewComp;