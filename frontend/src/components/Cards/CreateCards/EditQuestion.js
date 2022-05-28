import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../features/games/gameSelectors";
import { updateGame } from "../../../features/games/gameSlice";
import { updateQuestion } from "../../../features/questions/questionSlice";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { QuestionTextArea, TextInputQuestion } from "../../form/Question";
import { useAppDispatch } from "../../../features/hooks";
import QuestionWrapper from "../QuestionWrapper";

const actionDispatch = (dispatch) => ({
    updateQuestion: (query) => dispatch(updateQuestion(query)),
    updateGame: (query) => dispatch(updateGame(query))
});

const HeaderContent = () => <IconButton type="submit" sx={{color:'#141400', marginLeft:'auto', marginRight:'0.5rem'}}> <CloudUploadIcon style={{fontSize: 24}} /> </IconButton>;

const EditQuestion = ({question, setStateChangeQuestion}) => {
    const [values, setValues] = useState({
        type: question.type,
        question_desc: question.question_desc,
        hint: question.hint,
        phase: question.phase,
        related_week: question.related_week,
        related_game: question.related_game,
        punishment: question.punishment
    });

    const game = useSelector(selectedGame);
    const { updateQuestion, updateGame } = actionDispatch(useAppDispatch());

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

    return(
        <QuestionWrapper component="form" handleSubmit={handleSubmit} cardHeaderContent={<HeaderContent />} cardTitle={`#${question.id}`}>
            <TextInputQuestion label={"Type:"} handleChange={handleChange('type')} value={values.type} type={"text"}/>
            <TextInputQuestion label={"Fase:"} handleChange={handleChange('phase')} value={values.phase} type={"number"}/>
            <QuestionTextArea label={"SP:"} handleChange={handleChange('question_desc')} value={values.question_desc} />
            <QuestionTextArea label={"Hint:"} handleChange={handleChange('hint')} value={values.hint} />
            <TextInputQuestion label={"Straff:"} handleChange={handleChange('punishment')} value={values.punishment} type={"text"}/>
        </QuestionWrapper>
    );
};

export default EditQuestion;

