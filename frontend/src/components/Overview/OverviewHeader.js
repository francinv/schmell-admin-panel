import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGameCount, selectQuestionsCount, selectTaskOverdue, selectTaskUnsolved } from '../../features/statistics/statisticSelectors';
import DayInfoCard from '../Cards/DisplayCards/DayInfoCard';

const OverviewHeader = () => {
    const gameCount = useSelector(selectGameCount);
    const questionsCount = useSelector(selectQuestionsCount);
    const unsolvedCount = useSelector(selectTaskUnsolved);
    const overdueCount = useSelector(selectTaskOverdue);

    return (
       <Box
            sx={{
                display: 'flex',
                width: '95%',
                margin: '0 auto 0 auto'
            }}
       >
           <DayInfoCard title="Uløste oppgaver" content={unsolvedCount} positioning="first" />
           <DayInfoCard title="Oppgaver over frist" content={overdueCount} positioning="none" />
           <DayInfoCard title="Antall spill" content={gameCount} positioning="none" />
           <DayInfoCard title="Antall spørsmål" content={questionsCount} positioning="last" />
       </Box> 
    )
}

export default OverviewHeader;