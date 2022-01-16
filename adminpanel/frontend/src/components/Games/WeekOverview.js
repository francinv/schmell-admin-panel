import React, { useState } from "react";
import { Box, FormControl, FormHelperText, IconButton, OutlinedInput, TextField, Typography, typographyClasses } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedGame, selectWeeks } from "../../features/selectors";
import { HeaderContainer } from "../layout/content_header/header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import WeekCard from "./Cards/WeekCard";
import { CreateWeekCard } from "./CustomComponents/CreateWeekCard";
import {sortWeek} from "../../utils/weekUtil";



export const WeekOverview = ({setStage}) => {
    const weeks = useSelector(selectWeeks);
    const game = useSelector(selectedGame);

    const getSubTitle = () => {
        return( <CARD_TEXT sx={{alignSelf:'center'}}><b>Spill:</b> {game.name}</CARD_TEXT>);
    }

    const getButton = () => {
        return(
            <IconButton
                onClick={() => setStage('G')}
                size="large"
                sx={{color:'#141400'}}
            >
                <ArrowBackIosNewOutlinedIcon />
            </IconButton>
        )
    }

    function getSortedWeeks(weeks) {
        let tempWeeks = weeks.slice();
        var arr = tempWeeks.sort((a,b) => {
            return a.week_number - b.week_number;
        })
        return arr;
    }

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Velg uke"} sub_title={getSubTitle()} button={getButton()}/>
            <Box
                sx={{
                    width:'95%',
                    display:'flex',
                    bgcolor:'#fff',
                    flexWrap:'wrap',
                    marginTop:'50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '8px',
                    justifyContent: 'center',
                }}
            >
                {(getSortedWeeks(weeks)).map((week) => (
                    <WeekCard setStage={setStage} week={week} key={week.id}></WeekCard>
                ))}
                    <CreateWeekCard />
            </Box>
        </Box>
    )

}