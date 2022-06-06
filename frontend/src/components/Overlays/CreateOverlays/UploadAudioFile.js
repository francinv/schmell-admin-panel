import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { FileContainer, SelectContainerSmall } from "../../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useAppDispatch } from "../../../features/hooks";
import { useSelector } from "react-redux";
import { addAudioFile } from "../../../features/audiofiles/audioFileSlice";
import { selectAudioFileError, selectAudioFileStatus } from "../../../features/audiofiles/audiofileSelector";
import { resetUploadFile, parseQuestionsToOptions } from "../../../utils/audioFileUtil";
import axiosService from "../../../services/axiosService";
import { genderOptions } from "../../../constants/audioFileConstants";
import ModalWrapper from "../../layout/ModalWrapper";
import BtnSubmit from "../../Buttons/BtnSubmit";
import FormOverlayWrapper from "../../layout/FormOverlayWrapper";

const actionDispatch = (dispatch) => ({
    addFile: (query) => dispatch(addAudioFile(query))
})

const UploadAudioFile = ({open, handleClose}) => {
    const [fileState, setFileState] = useState('');
    const [questionOptions, setQuestionOptions] = useState([]);
    const [values, setValues] = useState({
        related_question_id: '',
        gender_voice: 'M',
    });

    const { addFile } = actionDispatch(useAppDispatch());

    const status = useSelector(selectAudioFileStatus);
    const error = useSelector(selectAudioFileError);

    useEffect(() => {
        fetchAllQuestions();
    }, [])
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = new FormData();

        Object.keys(values).forEach(key => data.append(key, values[key]));
        data.append('file', fileState);
        addFile(data);

        if (status === 'succeeded') {
            handleClose();
            setValues(resetUploadFile(values));
            setFileState('');
        }
    }

    const fetchAllQuestions = async () => {
        axiosService
            .get('cms/question/')
            .then( response => {
                setQuestionOptions(parseQuestionsToOptions(response.data));
            });
    }

    return (
        <ModalWrapper handleClose={handleClose} modalTitle="Last opp lydfil" open={open}>
            <FormOverlayWrapper handleSubmit={handleSubmit}>
                <SelectContainerSmall label="Velg kjønn:" onChange={handleChange('gender_voice')} options={genderOptions} value={values.gender_voice} width='65%' />
                <SelectContainerSmall label="Velg tilhørende spørsmål:" onChange={handleChange('related_question_id')} options={questionOptions} value={values.related_question_id} width='65%' />
                <FileContainer label="Last opp lydfil:" placeholder="Velg fil:" fileState={fileState} setFileState={setFileState}/>
                { status === 'failed' ? <Alert><AlertTitle>Server error</AlertTitle>{error}</Alert> : null}
                <BtnSubmit btnText="Submit" endIcon={<SportsEsportsIcon />} width='40%'/>
            </FormOverlayWrapper>
        </ModalWrapper>
    )
}

export default UploadAudioFile;