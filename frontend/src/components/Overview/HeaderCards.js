import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import InfoCard from './Cards/InfoCard';
import { selectGameCount, selectQuestionsCount, selectTaskOverdue, selectTaskUnsolved } from '../../features/statistics/statisticSelectors';



const HeaderCards = () => {
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
           <InfoCard title={"Uløste oppgaver"} content={unsolvedCount} marginLeft={"0"} marginRight={"0.5rem"}/>
           <InfoCard title={"Oppgaver over frist"} content={overdueCount} marginLeft={"0.5rem"} marginRight={"0.5rem"}/>
           <InfoCard title={"Antall spill"} content={gameCount} marginLeft={"0.5rem"} marginRight={"0.5rem"}/>
           <InfoCard title={"Antall spørsmål"} content={questionsCount} marginLeft={"0"} marginRight={"0"}/>
       </Box> 
    )
}

export default HeaderCards;