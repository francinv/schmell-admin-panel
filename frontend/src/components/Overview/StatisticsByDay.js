import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSolved } from '../../features/statistics/statisticSelectors';
import { getParsedDate } from '../../utils/dateUtil';
import { CARD_TEXT, H3 } from '../styles/Typography';
import GeneralInfoCard from '../Cards/DisplayCards/GeneralInfoCard';
import GameStatisticsTable from './StatisticsByGame';
import appSettings from '../../../package.json';

const StatisticsByDay = () => {
    const solved = useSelector(selectSolved);

    return (
        <Box
            sx={{
                display:'flex',
                width: '95%',
                margin: '0.5rem auto 0.5rem auto',
                bgcolor: '#fff',
                borderRadius: '8px',
                border: '1px solid #DFE0EB'
            }}
        >
            <Box
                sx={{
                    width: '70%'
                }}
            >
                <Box sx={{padding: '0.9375rem 0.75rem'}}>
                    <H3>Dagens statistikk</H3>
                    <CARD_TEXT sx={{color: '#9FA2B4'}}>{getParsedDate()}</CARD_TEXT>
                    <GameStatisticsTable />
                </Box>

            </Box>
            <Box
                sx={{
                    width: '30%',
                    borderLeft: '1px solid #DFE0EB'
                }}
            >
                <GeneralInfoCard content={solved} title="Løste oppgaver" positioning="first" />
                <GeneralInfoCard content="20" title="Antall brukere" positioning="none" />
                <GeneralInfoCard content="12" title="Antall spill spilt" positioning="none" />
                <GeneralInfoCard content="100kr" title="Inntekt" positioning="none" />
                <GeneralInfoCard content={appSettings.version} title="Versjon" positioning="last" />
            </Box>
        </Box>
    );
};

export default StatisticsByDay;