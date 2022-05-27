import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../../features/games/gameSelectors";
import { updateGame } from "../../../../features/games/gameSlice";
import { updateQuestion } from "../../../../features/questions/questionSlice";
import { H3 } from "../../../styles/Typography";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { QuestionTextArea, TextInputQuestion } from "../../../form/Question";
import { useAppDispatch } from "../../../../features/hooks";

const actionDispatch = (dispatch) => ({
    updateQuestion: (query) => dispatch(updateQuestion(query)),
    updateGame: (query) => dispatch(updateGame(query))
})

export const EditQuestionCard = ({question, setStateChangeQuestion}) => {
    const game = useSelector(selectedGame);
    const { updateQuestion } = actionDispatch(useAppDispatch());
    const { updateGame } = actionDispatch(useAppDispatch());

    const [values, setValues] = useState({
        type: question.type,
        question_desc: question.question_desc,
        hint: question.hint,
        phase: question.phase,
        related_week: question.related_week,
        related_game: question.related_game,
        punishment: question.punishment
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tempQuestion = {
            content: values,
            id: question.id,
        }
        const today = {last_updated: new Date().toISOString().split('T')[0]}
        updateQuestion(tempQuestion);
        const tempGame = {
            content: today,
            id: game.id,
        }
        updateGame(tempGame);
        setStateChangeQuestion(false);
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        setFileState(event.target.files[0]);
    }

    return(
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
            component="form"
            onSubmit={handleSubmit}
        > 
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: '0.5rem',
                }}
            >
                <H3 sx={{color:'#9FA2B4'}}>#{question.id}</H3>
                <IconButton type="submit" sx={{color:'#141400', marginLeft:'auto', marginRight:'0.5rem'}}>
                    <CloudUploadIcon style={{fontSize: 24}} />
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
                <TextInputQuestion label={"Type:"} handleChange={handleChange('type')} value={values.type} type={"text"}/>
                <TextInputQuestion label={"Fase:"} handleChange={handleChange('phase')} value={values.phase} type={"number"}/>
                <QuestionTextArea label={"SP:"} handleChange={handleChange('question_desc')} value={values.question_desc} />
                <QuestionTextArea label={"Hint:"} handleChange={handleChange('hint')} value={values.hint} />
                <TextInputQuestion label={"Straff:"} handleChange={handleChange('punishment')} value={values.punishment} type={"text"}/>
            </Box>

        </Box>
    )
}