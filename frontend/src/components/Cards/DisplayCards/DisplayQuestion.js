import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionWrapper from "../QuestionWrapper";
import { useAppDispatch } from "../../../features/hooks";
import DeleteDialog from "../../Dialog/DeleteDialog";
import { CARD_TEXT } from "../../styles/Typography";
import { subCountByGame } from "../../../features/statistics/statisticSlice";
import { deleteQuestion } from "../../../features/questions/questionSlice";
import { selectedGame } from "../../../features/games/gameSelectors";

const actionDispatch = (dispatch) => ({
    deleteQuestion: (query) => dispatch(deleteQuestion(query)),
    subCountByGame: (query) => dispatch(subCountByGame(query))
});

const HeaderContent = ({ setStateChangeQuestion, handleShow }) => (
    <>
        <IconButton onClick={() => setStateChangeQuestion(true)} sx={{color:'#141400', marginLeft:'auto'}}>
            <EditIcon style={{fontSize: 24}} />
        </IconButton>
        <IconButton onClick={handleShow} sx={{color:'#141400'}}>
            <DeleteIcon style={{fontSize: 24}} />
        </IconButton>
    </>
);

const DisplayQuestion = ({question, setStateChangeQuestion}) => {
    const { deleteQuestion, subCountByGame } = actionDispatch(useAppDispatch());
    const game = useSelector(selectedGame);

    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    const handleDelete = () => {
        deleteQuestion(question.id);
        subCountByGame(game.id);
    }

    return (
        <QuestionWrapper 
            cardHeaderContent={<HeaderContent setStateChangeQuestion={setStateChangeQuestion} handleShow={handleShow} />} 
            cardTitle={`#${question.id}`} 
            handleSubmit={null} 
            component="div"
        >
            <CARD_TEXT><b>Type:  </b>{question.type}</CARD_TEXT> 
            <CARD_TEXT><b>Fase:  </b>{question.phase}</CARD_TEXT> 
            <CARD_TEXT><b>SP:  </b>{question.question_desc}</CARD_TEXT> 
            <CARD_TEXT><b>Hint:  </b>{question.hint}</CARD_TEXT> 
            <CARD_TEXT><b>Straff: </b>{question.punishment}</CARD_TEXT>
            <CARD_TEXT><b>Relatert til:  </b>{question.related_question}</CARD_TEXT> 
            <CARD_TEXT><b>Funksjoner:  </b>{question.function}</CARD_TEXT>
            <DeleteDialog open={open} handleDelete={handleDelete} handleShow={handleShow} />
        </QuestionWrapper>
    );
}

export default DisplayQuestion;