import React from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { H1 } from "../styles/Typography";
import { InputTextArea, InputTextField } from "../form";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { updateGame } from "../../features/games/gameSlice";
import { useAppDispatch } from "../../features/hooks";
import { useSelector } from "react-redux";
import { selectedGame, selectedWeek } from "../../features/selectors";
import { postQuestion } from "../../features/questions/questionSlice";

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
    postQuestion: (query) => dispatch(postQuestion(query)),
    updateGame: (query) => dispatch(updateGame(query))
})

const CreateQuestionForm = ({open, handleClose}) => {
    const week = useSelector(selectedWeek);
    const game = useSelector(selectedGame);
    const { postQuestion } = actionDispatch(useAppDispatch());
    const { updateGame } = actionDispatch(useAppDispatch());

    const [values, setValues] = React.useState({
        type: '',
        question_desc: '',
        hint: '',
        related_question: '',
        phase: '',
        function: '',
        related_week: week.id,
        related_game: game.id
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        postQuestion(values);
        const today = new Date().toISOString().split('T')[0];
        const temp = {
            content: today,
            id: game.id,
        }   
        updateGame(temp);
        handleClose();
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
                    <H1>Opprett spørsmål</H1>
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
                            label="Type:" 
                            placeholder="Skriv inn type spørsmål..." 
                            onChange={handleChange('type')}
                            value={values.type}
                            type={"text"}
                        />
                        <InputTextArea
                            label="Spørsmål:"
                            placeholder="Skriv inn spørsmålet... "
                            value={values.question_desc}
                            onChange={handleChange('question_desc')}
                        />
                        <InputTextArea
                            label="Hint:"
                            placeholder="Skriv inn hint... "
                            value={values.hint}
                            onChange={handleChange('hint')}
                        />
                        <InputTextField 
                            label="Relatert til:" 
                            placeholder="Skriv inn id på relatert spørsmål..." 
                            onChange={handleChange('related_question')}
                            value={values.related_question}
                            type={"text"}
                        />
                        <InputTextField 
                            label="Fase:" 
                            placeholder="Skriv inn fase..." 
                            onChange={handleChange('phase')}
                            value={values.phase}
                            type={"number"}
                        />
                        <InputTextField 
                            label="Funksjon:" 
                            placeholder="Skriv inn funksjon..." 
                            onChange={handleChange('function')}
                            value={values.function}
                            type={"text"}
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

export default CreateQuestionForm;