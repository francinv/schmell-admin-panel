import React, { useEffect } from "react";
import { IconButton} from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import { sortWeeks } from "../../utils/sortUtil";
import { useAppDispatch } from "../../features/hooks";
import { fetchWeeks, resetWeek } from "../../features/weeks/weekSlice";
import { selectedGame } from "../../features/games/gameSelectors";
import { selectWeeks, selectWeeksStatus } from "../../features/weeks/weekSelectors";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";
import CreateWeekCard from "../Cards/CreateCards/CreateWeekCard";
import WeekCard from "../Cards/DisplayCards/WeekCard";


const actionDispatch = (dispatch) => ({
    getWeeks: (query) => dispatch(fetchWeeks(query)),
    resetWeek: () => dispatch(resetWeek())
})

export const WeekOverview = ({setStage}) => {
    const game = useSelector(selectedGame);
    const weeks = useSelector(selectWeeks);
    const weeksStatus = useSelector(selectWeeksStatus);
    
    const { getWeeks, resetWeek } = actionDispatch(useAppDispatch());

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
        <ContentWrapper pageTitle="Velg uke" subTitle={getSubTitle()} button={getButton()}>
            <InnerWrapper>
                {(sortWeeks(weeks)).map((week) => (
                    <WeekCard setStage={setStage} week={week} key={week.id}></WeekCard>
                ))}
                    <CreateWeekCard />
            </InnerWrapper>
        </ContentWrapper>
    )

}