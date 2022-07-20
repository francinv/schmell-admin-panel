import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { FileContainer, InputContainer, RadioContainer, TextAreaContainer } from "../../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { postGame } from "../../../features/games/gameSlice";
import { useAppDispatch } from "../../../features/hooks";
import { addGameCount, resetStatistics } from '../../../features/statistics/statisticSlice';
import { useSelector } from "react-redux";
import FileDialog from "../../Dialog/FileDialog";
import { selectGameError, selectGameStatus } from "../../../features/games/gameSelectors";
import { resetCreateGame } from "../../../utils/gameUtil";
import { STATUS_OPTIONS } from "../../../constants/gameConstants";
import ModalWrapper from "../../layout/ModalWrapper";
import BtnSubmit from "../../Buttons/BtnSubmit";
import FormOverlayWrapper from "../../layout/FormOverlayWrapper";

const actionDispatch = (dispatch) => ({
    addGame: (query) => dispatch(postGame(query)),
    addCount: () => dispatch(addGameCount()),
});

const AddGame = ({ open, handleClose }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        description: '',
        last_updated: new Date().toISOString().split('T')[0],
        status: 'D',
        release_date: '',
    });
    const [fileState, setFileState] = useState('');

    const status = useSelector(selectGameStatus);
    const error = useSelector(selectGameError);

    const { addGame, addCount } = actionDispatch(useAppDispatch());

    const handleShow = () => {
        setDialogOpen((wasOpen) => !wasOpen);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitData = () => {
        let data = new FormData();
        Object.keys(values).forEach(key => data.append(key, values[key]));
        data.append('logo', fileState);
        addGame(data);
        
        if (status === 'succeeded') {
            handleClose();
            setValues(resetCreateGame(values));
            setFileState('');
            addCount(1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fileState === '') {
            handleShow();
        }
        else {
            submitData();
        }
    };

    return (
        <ModalWrapper open={open} handleClose={handleClose} modalTitle="Opprett spill">
            <FormOverlayWrapper handleSubmit={handleSubmit}>
                <InputContainer label="Navn" placeholder="Skriv inn navn på spill..." onChange={handleChange('name')} value={values.name} type="text" />
                <TextAreaContainer label="Beskrivelse" placeholder="Beskrivelse om spillet..." value={values.description} onChange={handleChange('description')} />
                <RadioContainer label="Status:" value={values.status} onChange={handleChange('status')} options={STATUS_OPTIONS} />
                <FileContainer label="Last opp logo:" placeholder="Velg fil:" fileState={fileState} setFileState={setFileState} />
                <InputContainer label="Forventet utslippsdato:" value={values.release_date} onChange={handleChange('release_date')} type="datetime-local" />  
                {
                    status === 'failed'
                    ?   <Alert>
                            <AlertTitle>Server error</AlertTitle>
                            {error}
                        </Alert>
                    : null
                }
                <BtnSubmit btnText="Submit" endIcon={<SportsEsportsIcon />} />
                <FileDialog open={dialogOpen} handleShow={handleShow} dataSubmit={submitData}/>
            </FormOverlayWrapper>
        </ModalWrapper>
    );
};

export default AddGame;