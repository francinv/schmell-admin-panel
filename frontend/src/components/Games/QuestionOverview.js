import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { HeaderContainer } from "../layout/content_header/header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import { HeaderQuestionsComponent } from "./CustomComponents/HeaderContainer";
import CreateQuestionForm from "./CreateQuestion";
import QuestionCard from "./Cards/QuestionCard";
import { fetchQuestionByWeek, resetQuestionByWeek } from "../../features/questions/questionSlice";
import { sortGames } from "../../utils/sortUtil";
import { useAppDispatch } from "../../features/hooks";
import { selectedGame } from "../../features/games/gameSelectors";
import { selectQuestionsByWeek, selectQuestionStautsByWeek } from '../../features/questions/questionSelectors';
import { selectedWeek } from "../../features/weeks/weekSelectors";

const actionDispatch = (dispatch) => ({
    getQuestions: (query) => dispatch(fetchQuestionByWeek(query)),
    resetQuestions: () => dispatch(resetQuestionByWeek())
})

export const QuestionsOverview = ({setStage}) => {
    const questions = useSelector(selectQuestionsByWeek);
    const questionsStatus = useSelector(selectQuestionStautsByWeek);
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);
    const { getQuestions } = actionDispatch(useAppDispatch());
    const { resetQuestions } = actionDispatch(useAppDispatch());
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (questionsStatus === 'idle') {
            getQuestions(week.id);
        }
    }, [questions, questionsStatus])

    const getSubTitle = () => {
        return( <CARD_TEXT sx={{alignSelf:'center'}}><b>Spill: </b> {game.name} / <b>Uke: </b> {week.week_number}</CARD_TEXT>);
    }

    const getButton = () => {
        return(
            <IconButton
                onClick={() => {
                    setStage('W');
                    resetQuestions();
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
            <HeaderContainer page_title={"Spørsmål"} sub_title={getSubTitle()} button={getButton()}/>
            <HeaderQuestionsComponent handleOpen={handleOpen} />
            <Box
                sx={{
                    width:'95%',
                    display:'flex',
                    bgcolor:'#fff',
                    flexWrap:'wrap',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '0px 0px 8px 8px',
                    justifyContent: 'center',
                }}
            >
                {(sortGames(questions)).map((question) => (
                    <QuestionCard question={question} key={question.id} />
                ))}
                <CreateQuestionForm handleClose={handleClose} open={open} />
            </Box>
        </Box>
    );
}