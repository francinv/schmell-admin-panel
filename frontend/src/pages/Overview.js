import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../features/hooks';
import { fetchGames } from '../features/games/gameSlice';
import { selectStatisticStatus } from '../features/statistics/statisticSelectors';
import { fetchStatistics } from '../features/statistics/statisticSlice';
import TaskOverviewSection from '../components/Overview/TaskOverviewSection';
import ContentWrapper from '../components/layout/ContentWrapper';
import OverviewHeader from '../components/Overview/OverviewHeader';
import StatisticsByDay from '../components/Overview/StatisticsByDay';

const actionDispatch = (dispatch) => ({
    getGames: () => dispatch(fetchGames()),
    getStatistics: () => dispatch(fetchStatistics())
})

const Overview = ({ setActiveTab }) => {
    const staticsStatus = useSelector(selectStatisticStatus);

    const { getStatistics, getGames } = actionDispatch(useAppDispatch());
    
    useEffect(() => {
        if (staticsStatus === 'idle') {
            getGames();
            getStatistics();
        }
    }, [staticsStatus])

    return (
        <ContentWrapper pageTitle="Oversikt">
            <OverviewHeader /> 
            <StatisticsByDay /> 
            <TaskOverviewSection setActiveTab={setActiveTab} />
        </ContentWrapper>
    );
}

export default Overview;