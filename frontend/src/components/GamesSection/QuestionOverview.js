import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import QuestionHeader from "./QuestionHeader";
import { fetchQuestions, resetQuestions } from "../../features/questions/questionSlice";
import { sortGames } from "../../utils/sortUtil";
import { useAppDispatch } from "../../features/hooks";
import { selectedGame } from "../../features/games/gameSelectors";
import { selectQuestions, selectQuestionsError, selectQuestionStatus } from '../../features/questions/questionSelectors';
import { selectedWeek } from "../../features/weeks/weekSelectors";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";
import QuestionCard from "../Cards/DisplayCards/QuestionCard";
import CreateQuestion from "../Overlays/CreateOverlays/CreateQuestion";

const actionDispatch = (dispatch) => ({
    getQuestions: (query) => dispatch(fetchQuestions(query)),
    reset: () => dispatch(resetQuestions())
})

const QuestionOverview = ({ setStage }) => {
    const [open, setOpen] = useState(false);

    const questions = useSelector(selectQuestions);
    const questionsStatus = useSelector(selectQuestionStatus);
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);
    const error = useSelector(selectQuestionsError);
    
    const { getQuestions, reset } = actionDispatch(useAppDispatch());

    useEffect(() => {
        if (questionsStatus === 'idle') {
            getQuestions(week.id);
        }
    }, [questions, questionsStatus])

    const handleShow = () => setOpen((wasOpen) => !wasOpen);

    const getSubTitle = () => <CARD_TEXT sx={{alignSelf:'center'}}><b>Spill: </b> {game.name} / <b>Uke: </b> {week.week_number}</CARD_TEXT>;

    const getButton = () => {
        return(
            <IconButton
                onClick={() => {
                    setStage('W');
                    reset();
                }}
                size="large"
                sx={{color:'#141400'}}
            >
                <ArrowBackIosNewOutlinedIcon />
            </IconButton>
        )
    }

    return (
        <ContentWrapper pageTitle="Spørsmål" subTitle={getSubTitle()} button={getButton()}>
            { questionsStatus === 'failed'
                ?   <Alert severity="warning">
                        <AlertTitle>Noe gikk galt</AlertTitle>
                        {error}
                    </Alert>
                : null
            }
            <QuestionHeader handleOpen={handleShow} />
            <InnerWrapper>
                {(sortGames(questions)).map((question) => (
                    <QuestionCard question={question} key={question.id} />
                ))}
                <CreateQuestion handleClose={handleShow} open={open} />
            </InnerWrapper>
        </ContentWrapper>
    );
};

export default QuestionOverview;