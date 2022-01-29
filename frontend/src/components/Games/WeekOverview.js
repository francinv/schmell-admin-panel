import React, { useEffect } from "react";
import { Box, IconButton} from "@mui/material";
import { useSelector } from "react-redux";
import { HeaderContainer } from "../layout/content_header/header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import WeekCard from "./Cards/WeekCard";
import { CreateWeekCard } from "./CustomComponents/CreateWeekCard";
import { sortWeeks } from "../../utils/sortUtil";
import { useAppDispatch } from "../../features/hooks";
import { fetchWeeks, resetWeek } from "../../features/weeks/weekSlice";
import { selectedGame } from "../../features/games/gameSelectors";
import { selectWeeks, selectWeeksStatus } from "../../features/weeks/weekSelectors";


const actionDispatch = (dispatch) => ({
    getWeeks: (query) => dispatch(fetchWeeks(query)),
    resetWeek: () => dispatch(resetWeek())
})

export const WeekOverview = ({setStage}) => {
    const { getWeeks } = actionDispatch(useAppDispatch());
    const { resetWeek } = actionDispatch(useAppDispatch());
    const game = useSelector(selectedGame);
    const weeks = useSelector(selectWeeks);
    const weeksStatus = useSelector(selectWeeksStatus);

    useEffect(() => {
        if (weeksStatus === 'idle') {
            getWeeks(game.id);
        }
    }, [weeks, weeksStatus])

    const getSubTitle = () => {
        return( <CARD_TEXT sx={{alignSelf:'center'}}><b>Spill:</b> {game.name}</CARD_TEXT>);
    }

    const getButton = () => {
        return(
            <IconButton
                onClick={() => {
                    setStage('G');
                    resetWeek();
                }}
                size="large"
                sx={{color:'#141400'}}
            >
                <ArrowBackIosNewOutlinedIcon />
            </IconButton>
        )
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
                {(sortWeeks(weeks)).map((week) => (
                    <WeekCard setStage={setStage} week={week} key={week.id}></WeekCard>
                ))}
                    <CreateWeekCard />
            </Box>
        </Box>
    )

}