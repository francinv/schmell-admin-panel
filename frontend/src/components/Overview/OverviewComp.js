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

const actionDispatch = (dispatch) => ({
    fetchGames: () => dispatch(fetchGames()),
    fetchStatistics: () => dispatch(fetchStatistics())
})

const OverviewComp = ({activeTab, setActiveTab}) => {
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
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <Box 
                component="main"
                sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
            >
                <HeaderContainer page_title={"Oversikt"} sub_title={undefined}/>
                <HeaderCards /> 
                <DayStatistics /> 
                <TaskOverviewSection setActiveTab={setActiveTab} />
            </Box>
        </Box>
    );
}

export default OverviewComp;