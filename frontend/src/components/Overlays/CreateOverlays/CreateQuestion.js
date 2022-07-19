import React, { useState } from "react";
import { InputContainer, TextAreaContainer } from "../../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { updateGame } from "../../../features/games/gameSlice";
import { useAppDispatch } from "../../../features/hooks";
import { useSelector } from "react-redux";
import { postQuestion } from "../../../features/questions/questionSlice";
import { resetQuestions } from "../../../utils/questionUtil";
import { selectedWeek } from "../../../features/weeks/weekSelectors";
import { selectedGame } from "../../../features/games/gameSelectors";
import { addCountByGame } from "../../../features/statistics/statisticSlice";
import ModalWrapper from "../../layout/ModalWrapper";
import BtnSubmit from "../../Buttons/BtnSubmit";
import FormOverlayWrapper from "../../layout/FormOverlayWrapper";

const actionDispatch = (dispatch) => ({
    addQuestion: (query) => dispatch(postQuestion(query)),
    putGame: (query) => dispatch(updateGame(query)),
    addCount: (query) => dispatch(addCountByGame(query)),
});

const CreateQuestion = ({open, handleClose}) => {
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);

    const { addQuestion, putGame, addCount } = actionDispatch(useAppDispatch());

    const [values, setValues] = useState({
        type: '',
        question_desc: '',
        phase: 0,
        function: '',
        punishment: 0,
        related_week: week.id,
        related_game: game.id
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addQuestion(values);
        const today = {last_updated: new Date().toISOString().split('T')[0]};
        const temp = {
            content: today,
            id: game.id,
        }   
        putGame(temp);
        handleClose();
        addCount(game.id);
        setValues(resetQuestions(values));
    };

    return (
        <ModalWrapper handleClose={handleClose} modalTitle="Opprett spørsmål" open={open}>
            <FormOverlayWrapper handleSubmit={handleSubmit}>
                <InputContainer label="Type:" placeholder="Skriv inn type spørsmål..." onChange={handleChange('type')} value={values.type} type="text" required={true} />
                <TextAreaContainer label="Spørsmål:" placeholder="Skriv inn spørsmålet... " value={values.question_desc} onChange={handleChange('question_desc')} required={true} />
                <InputContainer label="Fase:" placeholder="Skriv inn fase..." onChange={handleChange('phase')} value={values.phase} type="number" required={true} />
                <InputContainer label="Funksjon:" placeholder="Skriv inn funksjon..." onChange={handleChange('function')} value={values.function} type="text" required={false} />
                <InputContainer label="Straff:" placeholder="Skriv inn straff..." onChange={handleChange('punishment')} value={values.punishment} type="number" required={true}/>
                <BtnSubmit btnText="Submit" endIcon={<SportsEsportsIcon />} width='40%'/>
            </FormOverlayWrapper>
        </ModalWrapper>
    );
};

export default CreateQuestion;