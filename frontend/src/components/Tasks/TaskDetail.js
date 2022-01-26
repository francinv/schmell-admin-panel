import React, { useState } from "react";
import { Avatar, Button, IconButton, Modal, Paper, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { BODY_BOLD, CARD_TEXT, H1, H3, H4 } from "../styles/Typography";
import { useAppDispatch } from "../../features/hooks";
import { postTask, resetStatus } from "../../features/tasks/taskSlice";
import { getFullDate, getPriority } from "../../utils/taskUtil";
import { UpdateDateTime, UpdateSelectGame, UpdateSelectStatus } from "../form/Task/TaskDetail";
import { useSelector } from "react-redux";
import { selectSelectedTask } from "../../features/tasks/taskSelectors";

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
    addTask: (query) => dispatch(postTask(query)),
    resetTasks: (query) => dispatch(resetStatus(query))
})

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root':{
        fontSize: '12px',
        padding: '0.3rem 0.25rem 0.3rem 0.25rem',
        backgroundColor: '#fff',
        borderRadius: '8px 0px 0px 8px',
        border: '0px',
        '& .Mui-focused fieldset': {
            borderColor: 'black',
        },
        '& .MuiOutlinedInput-input':{
            backgroundColor: '#fff',
        }
    }
})

const tempConversations = [
    {
        "id": 1,
        "date": "2022-01-21T20:40:11.859650Z",
        "comment": "Kommentar 1",
        "written_by": {
            "id": 2,
            "username": "francinvincent",
            "first_name": "Francin",
            "last_name": "Vincent",
            "email": "francin.vinc@gmail.com",
            "mobile_number": 46629490,
            "alerts_task": false,
            "alerts_deadlines": false,
            "profile_picture": "http://127.0.0.1:8000/media/profile-pictures/016C1748-8E59-41EE-A0F4-9AFE1EF4474E_gYqQUqV.jpg"
        },
        "related_conversation": 1
    },
    {
        "id": 2,
        "date": "2022-01-21T20:40:50.527870Z",
        "comment": "Kommentar 2",
        "written_by": {
            "id": 1,
            "username": "schmell",
            "first_name": "",
            "last_name": "",
            "email": "hei@schmell.com",
            "mobile_number": null,
            "alerts_task": true,
            "alerts_deadlines": true,
            "profile_picture": null
        },
        "related_conversation": 1
    },
    {
        "id": 3,
        "date": "2022-01-21T20:41:03.249046Z",
        "comment": "Kommentar 3",
        "written_by": {
            "id": 2,
            "username": "francinvincent",
            "first_name": "Francin",
            "last_name": "Vincent",
            "email": "francin.vinc@gmail.com",
            "mobile_number": 46629490,
            "alerts_task": false,
            "alerts_deadlines": false,
            "profile_picture": "http://127.0.0.1:8000/media/profile-pictures/016C1748-8E59-41EE-A0F4-9AFE1EF4474E_gYqQUqV.jpg"
        },
        "related_conversation": 1
    },
    {
        "id": 4,
        "date": "2022-01-21T20:41:17.849607Z",
        "comment": "Kommentar 4",
        "written_by": {
            "id": 1,
            "username": "schmell",
            "first_name": "",
            "last_name": "",
            "email": "hei@schmell.com",
            "mobile_number": null,
            "alerts_task": true,
            "alerts_deadlines": true,
            "profile_picture": null
        },
        "related_conversation": 1
    },
    {
        "id": 5,
        "date": "2022-01-21T20:42:28.393444Z",
        "comment": "Kommentar 1",
        "written_by": {
            "id": 1,
            "username": "schmell",
            "first_name": "",
            "last_name": "",
            "email": "hei@schmell.com",
            "mobile_number": null,
            "alerts_task": true,
            "alerts_deadlines": true,
            "profile_picture": null
        },
        "related_conversation": 2
    },
    {
        "id": 6,
        "date": "2022-01-21T20:43:07.807103Z",
        "comment": "Kommentar 2",
        "written_by": {
            "id": 1,
            "username": "schmell",
            "first_name": "",
            "last_name": "",
            "email": "hei@schmell.com",
            "mobile_number": null,
            "alerts_task": true,
            "alerts_deadlines": true,
            "profile_picture": null
        },
        "related_conversation": 2
    }
]

const TaskDetail = ({open, handleShow}) => {
    const { addTask } = actionDispatch(useAppDispatch());
    const { resetTasks } = actionDispatch(useAppDispatch());
    const task = useSelector(selectSelectedTask);
    const [tempComment, setTempComment] = useState('');

    const [values, setValues] = useState({
        status: task.status,
        deadline: task.deadline,
        related_game: task.related_game
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        resetTasks();
        handleShow();
    }

    const handleComment = (event) => {
        event.preventDefault();
        console.log(tempComment);
    }

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
                    <H1>{task.title}</H1>
                </Box>
                <Box
                    sx={{
                        width: '95%',
                        display:'flex',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            width: '65%',
                            display:'flex',
                            flexDirection: 'column',
                            marginTop: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: '135px',
                                bgcolor: '#fff',
                                borderRadius: '8px',
                                padding: '0.8rem',
                                display:'flex',
                                flexDirection: 'column',
                                marginBottom: '1rem',
                            }}
                        >
                            <H4>Beskrivelse</H4>
                            <CARD_TEXT sx={{marginTop: '1rem'}}>{task.description}</CARD_TEXT>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: '350px',
                                borderRadius: '8px',
                                bgcolor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '1rem',
                                padding: '0.8rem',
                            }}
                        >
                            <H4>Kommentarer</H4>
                            <Paper 
                                style={{maxHeight: 250, overflow: 'auto'}} 
                                sx={{
                                    borderRadius: '8px 8px 0px 0px',
                                    borderBottom: '1px solid #9FA2B4'
                                }} 
                                elevation={0}
                            >
                                <Box 
                                    sx={{
                                        width: '100%',
                                        minHeight: 250,
                                        bgcolor: '#E5E5E5',
                                        display:'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                > 
                                    {(tempConversations.map((conversation)=> (
                                        <Box
                                            sx={{
                                                width: '90%',
                                                marginTop: '0.2rem',
                                                marginBottom: '0.2rem'
                                            }}
                                            key={conversation.id}
                                        >
                                            <Typography sx={{fontSize: 8, color: '#808080'}}>{getFullDate(conversation.date)}</Typography>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    bgcolor: '#fff',
                                                    borderRadius: '8px',
                                                    alignItems: 'center',
                                                    padding: '0.2rem 0.5rem 0.2rem 0.2rem',
                                                }}
                                            >
                                                <Avatar 
                                                    alt={conversation.written_by.username}
                                                    src={conversation.written_by.profile_picture}
                                                    sx={{width: 25, height: 25}}
                                                />
                                                <Typography sx={{fontSize: 12, marginLeft:'auto'}}>{conversation.comment}</Typography>
                                            </Box>
                                        </Box>
                                    )))}
                                </Box>
                            </Paper>
                            <Box
                                sx={{
                                    bgcolor: '#E5E5E5',
                                    height: '60px',
                                    padding: '0.25rem 0.5rem 0.25rem 0.5rem'
                                }}
                            >
                                <Box
                                    sx={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        height: '100%',
                                    }}
                                    component="form"
                                    onSubmit={handleComment}
                                >
                                    <CustomTextField 
                                        rows={2}
                                        multiline
                                        placeholder="Kommenter her..."
                                        value={tempComment}
                                        onChange={handleCommentChange}
                                        fullWidth
                                    />
                                    <Button
                                        sx={{
                                            backgroundColor: '#E0E000',
                                            color: '#141400',
                                            borderRadius: '0px 8px 8px 0px',
                                            height: '75%',
                                            '&:hover':{
                                                backgroundColor: '#f0f080',
                                            }
                                        }}
                                        type="submit"  
                                    >Post</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            width: '30%',
                            flexDirection: 'column',
                            marginLeft: 'auto',
                            height: '100%',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            marginTop: '1rem',
                            paddingLeft: '0.5rem',
                            alignSelf: 'stretch',
                        }}
                    >
                        <H4 sx={{marginBottom: '1rem'}}>Informasjon</H4>
                        <Box sx={{display:'flex', width: '90%'}}>
                            <BODY_BOLD>Status:</BODY_BOLD>
                            <UpdateSelectStatus value={values.status} onChange={handleChange('status')} />
                        </Box>
                        <Box sx={{display:'flex', width: '90%'}}>
                            <BODY_BOLD>Frist:</BODY_BOLD>
                            <UpdateDateTime value={values.deadline} onChange={handleChange('deadline')} />
                        </Box>
                        <Box sx={{display:'flex', width: '90%'}}>
                            <BODY_BOLD>Prioritet:</BODY_BOLD>
                            <Box sx={{width:'70%'}}>{getPriority(task.priority)}</Box>
                        </Box>
                        <Box sx={{display:'flex', width: '90%'}}>
                            <BODY_BOLD>Kategori:</BODY_BOLD>
                            <Typography>{task.category}</Typography>
                        </Box>
                        <UpdateSelectGame 
                            onChange={handleChange('related_game')} 
                            value={values.related_game} 
                            category={task.category}    
                            label="Relatert spill"
                        />
                        <Box
                            sx={{
                                display:'flex', width: '90%'
                            }}
                        >
                            {/* <Box>
                                <BODY_BOLD>Ansvarlig:</BODY_BOLD>
                                <Typography>{task.responsible.first_name} {task.responsible.last_name}</Typography>
                            </Box>
                            <Avatar 
                                alt={task.responsible.username}
                                src={task.responsible.profile_picture}
                                sx={{width:44, height: 44}}
                            /> */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>

    )
}

export default TaskDetail;