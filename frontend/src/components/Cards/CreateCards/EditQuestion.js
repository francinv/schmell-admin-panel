import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../features/games/gameSelectors";
import { updateGame } from "../../../features/games/gameSlice";
import { updateQuestion } from "../../../features/questions/questionSlice";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch } from "../../../features/hooks";
import QuestionWrapper from "../QuestionWrapper";
import { SmallInputContainer, SmallTextAreaContainer } from "../../form";

const actionDispatch = (dispatch) => ({
    changeQuestion: (query) => dispatch(updateQuestion(query)),
    changeGame: (query) => dispatch(updateGame(query))
});

const HeaderContent = () => <IconButton type="submit" sx={{color:'#141400', marginLeft:'auto', marginRight:'0.5rem'}}> <CloudUploadIcon style={{fontSize: 24}} /> </IconButton>;

const EditQuestion = ({question, setStateChangeQuestion}) => {
    const [values, setValues] = useState({
        type: question.type,
        question_desc: question.question_desc,
        phase: question.phase,
        function: question.function,
        punishment: question.punishment,
        related_week: question.related_week,
        related_game: question.related_game,
    });

    const game = useSelector(selectedGame);
    const { changeQuestion, changeGame } = actionDispatch(useAppDispatch());

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
        changeQuestion(tempQuestion);
        const tempGame = {
            content: today,
            id: game.id,
        }
        changeGame(tempGame);
        setStateChangeQuestion(false);
    }

    return(
        <QuestionWrapper component="form" handleSubmit={handleSubmit} cardHeaderContent={<HeaderContent />} cardTitle={`#${question.id}`}>
            <SmallInputContainer label="Type:" onChange={handleChange('type')} value={values.type} type="text"/>
            <SmallInputContainer label="Fase:" onChange={handleChange('phase')} value={values.phase} type="number"/>
            <SmallInputContainer label="Straff:" onChange={handleChange('punishment')} value={values.punishment} type="number"/>
            <SmallInputContainer label="Func:" onChange={handleChange('function')} value={values.function} type="text"/>
            <SmallTextAreaContainer label={"SP:"} onChange={handleChange('question_desc')} value={values.question_desc} />
        </QuestionWrapper>
    );
};

export default EditQuestion;

