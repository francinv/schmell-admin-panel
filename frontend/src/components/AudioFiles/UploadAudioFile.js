import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { H1 } from "../styles/Typography";
import { ImageUpload } from "../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useAppDispatch } from "../../features/hooks";
import { useSelector } from "react-redux";
import { addAudioFile } from "../../features/audiofiles/audioFileSlice";
import { selectAudioFileError, selectAudioFileStatus } from "../../features/audiofiles/audiofileSelector";
import { resetUploadFile } from "../../utils/audioFileUtil";
import axiosService from "../../utils/axios";
import { SelectGender, SelectQuestion } from "../form/AudioFiles";

const style_container = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: '#F7F8FC',
    border: '1px solid #141400',
    boxShadow: 24,
    paddingTop: 0.5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 2,
    borderRadius: 8,
};

const actionDispatch = (dispatch) => ({
    addFile: (query) => dispatch(addAudioFile(query))
})

const UploadAudioFile = ({open, handleClose}) => {
    const status = useSelector(selectAudioFileStatus);
    const error = useSelector(selectAudioFileError);
    const { addFile } = actionDispatch(useAppDispatch());
    const genderOptions = [
        { value: 'M', label: 'Mann' },
        { value: 'F', label: 'Kvinne' },
    ]
    const [questionOptions, setQuestionOptions] = useState([]);

    const [values, setValues] = useState({
        related_question_id: '',
        gender_voice: 'M',
    });
    
    const [fileState, setFileState] = useState('');

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
            .get('/question/')
            .then( response => setQuestionOptions(response.data));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style_container}>
                <Box 
                    sx={{
                        width: '100%',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent: 'flex-end',
                    }}
                >   
                    <IconButton
                        onClick={handleClose}
                        sx={{color:'#141400'}}
                    >
                        <CloseIcon style={{fontSize: 30}} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: '95%',
                        borderBottom: '1px solid #9FA2B4',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <H1>Last opp lydfil</H1>
                </Box>
                <Box
                    sx={{
                        width: '85%',
                        bgcolor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 8,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            width:'80%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                        }}
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <SelectGender onChange={handleChange('gender_voice')} options={genderOptions} value={values.gender_voice} />
                        <SelectQuestion onChange={handleChange('related_question_id')} options={questionOptions} value={values.related_question_id} />
                        <ImageUpload 
                            label="Last opp lydfil:"
                            placeholder="Velg fil:"
                            fileState={fileState}
                            setFileState={setFileState}
                        />
                        {
                            status === 'failed'
                            ?   <Alert>
                                    <AlertTitle>Server error</AlertTitle>
                                    {error}
                                </Alert>
                            : null
                        }
                        <Button
                            type="submit"
                            endIcon={<SportsEsportsIcon />}
                            sx={{
                                bgcolor: '#e0e000',
                                color: '#141400',
                                fontFamily: 'Quicksand',
                                fontSize: '14px',
                                fontWeight: 700,
                                width: '40%',
                                marginTop: '1.5rem',
                                '&:hover':{
                                    bgcolor: '#141400',
                                    color: '#e0e000',
                                }
                            }}
                        >Submit</Button>
                    </Box>
                    
                </Box>
            </Box>
        </Modal>

    )
}

export default UploadAudioFile;