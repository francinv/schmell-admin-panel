import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../../features/games/gameSelectors";
import { deleteQuestion } from "../../../../features/questions/questionSlice";
import { subCountByGame } from "../../../../features/statistics/statisticSlice";
import { CARD_TEXT, H3 } from "../../../styles/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "../../CustomComponents/DeleteDialog";
import { useAppDispatch } from "../../../../features/hooks";

const actionDispatch = (dispatch) => ({
    deleteQuestion: (query) => dispatch(deleteQuestion(query)),
    subCountByGame: (query) => dispatch(subCountByGame(query))
})

export const DisplayQuestionComp = ({question, setStateChangeQuestion}) => {
    const { deleteQuestion } = actionDispatch(useAppDispatch());
    const { subCountByGame } = actionDispatch(useAppDispatch());
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '16.67%',
                bgcolor:'#E5E5E5',
                marginTop: '1rem',
                marginBottom: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                }}
            >
                <H3 sx={{color:'#9FA2B4'}}>#{question.id}</H3>
                <IconButton onClick={() => setStateChangeQuestion(true)} sx={{color:'#141400', marginLeft:'auto'}}>
                    <EditIcon style={{fontSize: 24}} />
                </IconButton>
                <IconButton onClick={handleShow} sx={{color:'#141400'}}>
                    <DeleteIcon style={{fontSize: 24}} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '95%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingBottom: '1rem',
                }}
            >
                <CARD_TEXT><b>Type:  </b>{question.type}</CARD_TEXT> 
                <CARD_TEXT><b>Fase:  </b>{question.phase}</CARD_TEXT> 
                <CARD_TEXT><b>SP:  </b>{question.question_desc}</CARD_TEXT> 
                <CARD_TEXT><b>Hint:  </b>{question.hint}</CARD_TEXT> 
                <CARD_TEXT><b>Straff: </b>{question.punishment}</CARD_TEXT>
                <CARD_TEXT><b>Relatert til:  </b>{question.related_question}</CARD_TEXT> 
                <CARD_TEXT><b>Funksjoner:  </b>{question.function}</CARD_TEXT>
            </Box>
            <DeleteDialog open={open} handleDelete={handleDelete} handleShow={handleShow} />
        </Box>
    );
}