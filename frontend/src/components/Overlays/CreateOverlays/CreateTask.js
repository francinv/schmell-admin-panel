import React, { useState } from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { H1 } from "../../styles/Typography";
import { InputContainer, InputTextArea, InputTextField, PersonRadioContainer, RadioContainer, SelectContainerSmall, TextAreaContainer } from "../../form";
import { useAppDispatch } from "../../../features/hooks";
import { postTask, resetStatus } from "../../../features/tasks/taskSlice";
import { resetStatistics } from '../../../features/statistics/statisticSlice';
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { selectTaskStatus } from "../../../features/tasks/taskSelectors";
import { useSelector } from "react-redux";
import { parseGamesToOptions, resetFields } from "../../../utils/taskUtil";
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../constants/taskConstants";
import { selectGames } from "../../../features/games/gameSelectors";
import { selectActiveUser } from "../../../features/user/userSelectors";

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
    height: '80%',
    overflow: 'auto'
};

const actionDispatch = (dispatch) => ({
    addTask: (query) => dispatch(postTask(query)),
    resetTasks: (query) => dispatch(resetStatus(query)),
    resetStatistics: () => dispatch(resetStatistics())
});

const CreateTaskForm = ({open, handleShow}) => {
    const activeUser = useSelector(selectActiveUser);
    const [values, setValues] = useState({
        title: '',
        description: '',
        status: 'P',
        deadline: '',
        category: '',
        priority: '',
        user_id: '',
        related_game: '',
    });

    const { addTask, resetStatistics } = actionDispatch(useAppDispatch());

    const status = useSelector(selectTaskStatus);
    const games = useSelector(selectGames);

    const isGameCategory = values.category === 'G';

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addTask(values);
        if (status === 'succeeded') {
            handleShow();
            resetStatistics();
            setValues(resetFields(values))
        }
    };

    return (
        <Modal
        open={open}
        onClose={handleShow}
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
                        onClick={handleShow}
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
                    <H1>Opprett oppgave</H1>
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
                        <InputContainer label="Tittel" placeholder="Skriv inn tittel.." onChange={handleChange('title')} value={values.title} type="text" />
                        <TextAreaContainer label="Beskrivelse" placeholder="Beskriv oppgaven..." value={values.description} onChange={handleChange('description')} />
                        <SelectContainerSmall label="Status:" value={values.status} onChange={handleChange('status')} options={STATUS_OPTIONS} width='65%' />
                        <InputContainer label="Når er fristen?" value={values.deadline} onChange={handleChange('deadline')} type="datetime-local" />  
                        <SelectContainerSmall label="Velg kategori:" value={values.category} onChange={handleChange('category')} options={CATEGORY_OPTIONS} width='65%'/>
                        <RadioContainer label="Velg prioritet:" value={values.priority} onChange={handleChange('priority')} options={PRIORITY_OPTIONS} />
                        <PersonRadioContainer label="Hvem er ansvarlig?" onChange={handleChange('user_id')} />
                        { isGameCategory
                            ? <SelectContainerSmall label="Velg relatert spill:" value={values.related_game} onChange={handleChange('related_game')} options={parseGamesToOptions(games)} width='65%'/>
                            : null
                        }
                        <Button
                            type="submit"
                            endIcon={<AddCircleOutlineOutlined />}
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

export default CreateTaskForm;