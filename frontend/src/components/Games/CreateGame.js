import React from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { H1 } from "../styles/Typography";
import { CustomDateTimePicker, ImageUpload, InputTextArea, InputTextField, RadioThreeButtons, RadioTwoButtons } from "../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { postGame } from "../../features/games/gameSlice";
import { useAppDispatch } from "../../features/hooks";
import { resetStatistics } from '../../features/statistics/statisticSlice';

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
    addGame: (query) => dispatch(postGame(query)),
    resetStatistics: () => dispatch(resetStatistics())
})

const CreateGameForm = ({open, handleClose}) => {
    const { addGame } = actionDispatch(useAppDispatch());
    const { resetStatistics } = actionDispatch(useAppDispatch());

    const [values, setValues] = React.useState({
        name: '',
        description: '',
        related_questions: true,
        last_updated: new Date().toISOString().split('T')[0],
        status: 'D',
        release_date: '',
    });
    const [fileState, setFileState] = React.useState('');

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var data = new FormData();
        data.append('name', values.name);
        data.append('description', values.description)
        data.append('related_questions', values.related_questions);
        data.append('last_updated', values.last_updated);
        data.append('status', values.status);
        data.append('logo', fileState);
        data.append('release_date', values.release_date);
        addGame(data);
        handleClose();
        resetStatistics();
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
                    <H1>Opprett spill</H1>
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
                        <InputTextField 
                            label="Navn" 
                            placeholder="Skriv inn navn på spill..." 
                            onChange={handleChange('name')}
                            value={values.name}
                        />
                        <InputTextArea
                            label="Beskrivelse"
                            placeholder="Beskrivelse om spillet..."
                            value={values.description}
                            onChange={handleChange('description')}
                        />
                        <RadioTwoButtons 
                            label="Følgespørsmål?" 
                            value={values.related_questions} 
                            onChange={handleChange('related_questions')} 
                        />
                        <RadioThreeButtons
                            label="Status:"
                            value={values.status}
                            onChange={handleChange('status')}
                        />
                        <ImageUpload 
                            label="Last opp logo:"
                            placeholder="Velg fil:"
                            fileState={fileState}
                            setFileState={setFileState}
                        />
                        <CustomDateTimePicker 
                            label="Forventet utslippsdato:"
                            value={values.release_date}
                            onChange={handleChange('release_date')}
                        />  
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

export default CreateGameForm;