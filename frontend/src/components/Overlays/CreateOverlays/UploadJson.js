import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../features/games/gameSelectors";
import { updateGame } from "../../../features/games/gameSlice";
import { useAppDispatch } from "../../../features/hooks";
import { postQuestion } from "../../../features/questions/questionSlice";
import { addMultipleByGame } from "../../../features/statistics/statisticSlice";
import { selectedWeek } from "../../../features/weeks/weekSelectors";
import BtnSubmit from "../../Buttons/BtnSubmit";
import { LargeTextAreaContainer } from "../../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FormOverlayWrapper from "../../layout/FormOverlayWrapper";
import ModalWrapper from "../../layout/ModalWrapper";
import BtnAdd from "../../Buttons/BtnAdd";
import { Box } from "@mui/material";
import { H4 } from "../../styles/Typography";
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const actionDispatch = (dispatch) => ({
    uploadQuestions: (query) => dispatch(postQuestion(query)),
    putGame: (query) => dispatch(updateGame(query)),
    addCount: (query) => dispatch(addMultipleByGame(query)),
});

const UploadJson = props => {
    const {open, handleClose} = props;
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);

    const {uploadQuestions, putGame, addCount} = actionDispatch(useAppDispatch());

    const emptyElement = {
        type: '',
        question_desc: '',
        phase: 0,
        function: '',
        punishment: 0,
        related_week: week.id,
        related_game: game.id,
    }

    const [values, setValues] = useState([]);

    const handleChange = (event) => {
        setValues(JSON.parse(event.target.value));
    };

    const addElement = () => setValues(values.concat(emptyElement));
    const resetAll = () => setValues([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadQuestions(values);
        putGame({
            id: game.id,
            data: {last_updated: new Date().toISOString().split('T')[0]}
        });
        handleClose();
        addCount({ id: game.id, addedCount: values.length});
        resetAll();
    };

    return (
        <ModalWrapper handleClose={handleClose} modalTitle="Last opp et sett" open={open}>
            <FormOverlayWrapper handleSubmit={handleSubmit}>
                <Box sx={{width: '85%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem'}}>
                    <H4>Antall elementer i listen: {values.length}</H4>
                    <Box>
                        <BtnAdd handleClick={resetAll} btnText="Nullstill" borderRadius="8px 0px 0px 0px" endIcon={<RestartAltIcon />}/>
                        <BtnAdd handleClick={addElement} btnText="Legg til element" borderRadius={"0px 8px 0px 0px"} endIcon={<AddIcon />} />
                    </Box>
                </Box>
                <LargeTextAreaContainer value={JSON.stringify(values, undefined, 4)} onChange={handleChange} required={true} />
                <BtnSubmit btnText="Last opp" endIcon={<SportsEsportsIcon />} width='40%'/>
            </FormOverlayWrapper>
        </ModalWrapper>
    );
};

export default UploadJson;