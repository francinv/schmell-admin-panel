import React, {useState} from 'react';
import { Box, IconButton } from '@mui/material';
import { CARD_TEXT, H2, H3 } from '../../styles/Typography';
import { updateGame } from '../../../features/games/gameSlice';
import { useAppDispatch } from '../../../features/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectedGame } from '../../../features/selectors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { QuestionTextArea, TextInputQuestion } from '../../form';
import { deleteQuestion, updateQuestion } from '../../../features/questions/questionSlice';

const actionDispatch = (dispatch) => ({
    deleteQuestion: (query) => dispatch(deleteQuestion(query)),
    updateQuestion: (query) => dispatch(updateQuestion(query)),
    updateGame: (query) => dispatch(updateGame(query))
})

const QuestionCard = ({question}) => {
    const [stateChangeQuestion, setStateChangeQuestion] = useState(false);
    return (
        <>
            {
                stateChangeQuestion
                ? <ChangeQuestionCard question={question} setStateChangeQuestion={setStateChangeQuestion}/>
                : <SimpleQuestionDisplay question={question} setStateChangeQuestion={setStateChangeQuestion}/>
            }
        </>
    );
}

const SimpleQuestionDisplay = ({question, setStateChangeQuestion}) => {
    const { deleteQuestion } = actionDispatch(useAppDispatch());

    const handleDelete = () => {
        deleteQuestion(question.id);
    }

    return (
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
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                }}
            >
                <H3 sx={{color:'#9FA2B4'}}>#{question.id}</H3>
                <IconButton onClick={() => setStateChangeQuestion(true)} sx={{color:'#141400', marginLeft:'auto'}}>
                    <EditIcon style={{fontSize: 24}} />
                </IconButton>
                <IconButton onClick={handleDelete} sx={{color:'#141400'}}>
                    <DeleteIcon style={{fontSize: 24}} />
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
                <CARD_TEXT><b>Type:  </b>{question.type}</CARD_TEXT> 
                <CARD_TEXT><b>Fase:  </b>{question.phase}</CARD_TEXT> 
                <CARD_TEXT><b>SP:  </b>{question.question_desc}</CARD_TEXT> 
                <CARD_TEXT><b>Hint:  </b>{question.hint}</CARD_TEXT> 
                <CARD_TEXT><b>Relatert til:  </b>{question.related_question}</CARD_TEXT> 
                <CARD_TEXT><b>Funksjoner:  </b>{question.function}</CARD_TEXT>   
            </Box>
        </Box>
    );
}

const ChangeQuestionCard = ({question, setStateChangeQuestion}) => {
    const game = useSelector(selectedGame);
    const { updateQuestion } = actionDispatch(useAppDispatch());
    const { updateGame } = actionDispatch(useAppDispatch());

    const [values, setValues] = React.useState({
        type: question.type,
        question_desc: question.question_desc,
        hint: question.hint,
        phase: question.phase,
        related_week: question.related_week
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
        const today = new Date().toISOString().split('T')[0];
        updateQuestion(tempQuestion);
        const tempGame = {
            content: today,
            id: game.id,
        }
        updateGame(tempGame);
        setStateChangeQuestion(false);
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
            </Box>

        </Box>
    )
}

export default QuestionCard;