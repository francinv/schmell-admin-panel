import React from "react";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedGame, selectedWeek, selectQuestions } from "../../features/selectors";
import { HeaderContainer } from "../layout/content_header/header";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CARD_TEXT } from "../styles/Typography";
import { HeaderQuestionsComponent } from "./CustomComponents/HeaderContainer";
import CreateQuestionForm from "./CreateQuestion";
import QuestionCard from "./Cards/QuestionCard";

export const QuestionsOverview = ({setStage}) => {
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);
    const questions = useSelector(selectQuestions);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getSubTitle = () => {
        return( <CARD_TEXT sx={{alignSelf:'center'}}><b>Spill: </b> {game.name} / <b>Uke: </b> {week.week_number}</CARD_TEXT>);
    }

    const getButton = () => {
        return(
            <IconButton
                onClick={() => setStage('W')}
                size="large"
                sx={{color:'#141400'}}
            >
                <ArrowBackIosNewOutlinedIcon />
            </IconButton>
        )
    }

    function getSortedQuestions(questions) {
        let tempQuestions = questions.slice();
        var arr = tempQuestions.sort((a,b) => {
            return a.id - b.id;
        })
        return arr;
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
                {(getSortedQuestions(questions)).map((question) => (
                    <QuestionCard question={question} key={question.id}/>
                ))}
                <CreateQuestionForm handleClose={handleClose} open={open} />
            </Box>
        </Box>
    );
}