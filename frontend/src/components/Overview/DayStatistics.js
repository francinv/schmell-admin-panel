import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSolved } from '../../features/statistics/statisticSelectors';
import { getDate } from '../../utils/overviewUtil';
import { CARD_TEXT, H3 } from '../styles/Typography';
import AdditionalInfoCard from './Cards/AdditionalInfoCard';
import GameStatisticsTable from './GameStatisticsTable';

export default function DayStatistics() {
    var package_json = require('../../../package.json');
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
                    <CARD_TEXT sx={{color: '#9FA2B4'}}>{getDate()}</CARD_TEXT>
                    <GameStatisticsTable />
                </Box>

            </Box>
            <Box
                sx={{
                    width: '30%',
                    borderLeft: '1px solid #DFE0EB'
                }}
            >
                <AdditionalInfoCard 
                    borderBottom={"1px solid #DFE0EB"} 
                    content={solved} 
                    title={"Løste oppgaver"}
                    borderBottomRight={"0px"}
                    borderTopRight={"8px"}
                />
                <AdditionalInfoCard 
                    borderBottom={"1px solid #DFE0EB"} 
                    content={"20"} 
                    title={"Antall brukere"}
                    borderBottomRight={"0px"}
                    borderTopRight={"0px"}
                />
                <AdditionalInfoCard 
                    borderBottom={"1px solid #DFE0EB"} 
                    content={"12"} 
                    title={"Antall spill spilt"}
                    borderBottomRight={"0px"}
                    borderTopRight={"0px"}
                />
                <AdditionalInfoCard 
                    borderBottom={"1px solid #DFE0EB"} 
                    content={"100kr"} 
                    title={"Inntekt"}
                    borderBottomRight={"0px"}
                    borderTopRight={"0px"}
                />
                <AdditionalInfoCard 
                    borderBottom={"0px"} 
                    content={package_json.version} 
                    title={"Versjon"}
                    borderBottomRight={"8px"}
                    borderTopRight={"0px"}
                />

            </Box>

        </Box>
    )

}