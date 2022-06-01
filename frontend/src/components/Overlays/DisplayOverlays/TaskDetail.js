import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Modal, Paper, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { BODY_BOLD, CARD_TEXT, H1, H4 } from "../../styles/Typography";
import { useAppDispatch } from "../../../features/hooks";
import { resetStatus, updateTask } from "../../../features/tasks/taskSlice";
import { getCategory, getPriority, parseGamesToOptions } from "../../../utils/taskUtil";
import { getAllowedDate } from "../../../utils/dateUtil";
import { postComment } from "../../../features/comments/commentSlice";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../../features/user/userSelectors";
import { addSolved, resetStatistics } from "../../../features/statistics/statisticSlice";
import Comments from "../../Tasks/Comments";
import { InputContainer, SelectContainerSmall } from "../../form";
import { STATUS_OPTIONS } from "../../../constants/taskConstants";
import { selectGames } from "../../../features/games/gameSelectors";

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
    updateTask: (query) => dispatch(updateTask(query)),
    resetTasks: (query) => dispatch(resetStatus(query)),
    postComment: (query) => dispatch(postComment(query)),
    resetStatistics: () => dispatch(resetStatistics()),
    addSolved: () => dispatch(addSolved())
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


const TaskDetail = ({open, handleShow, task}) => {
    const { updateTask, resetTasks, postComment, resetStatistics, addSolved } = actionDispatch(useAppDispatch());

    const user = useSelector(selectActiveUser);
    const games = useSelector(selectGames);
    const [tempComment, setTempComment] = useState('');

    const [values, setValues] = useState({
        title: '',
        description: '',
        status: '',
        deadline: '',
        category: '',
        priority: '',
        user_id: '',
        related_game: '',
    });

    useEffect(() => {
        if (open) {
            setValues({
                ...values,
                title: task.title,
                description: task.description,
                status: task.status,
                deadline: getAllowedDate(task.deadline),
                category: task.category,
                priority: task.priority,
                user_id: task.responsible.id,
                related_game: task.related_game,
            });
        }
    }, [open, task]);
    
    
    const handleChange = (prop) => (event) => {
        switch (prop) {
            case 'status':
                values.status = event.target.value;
                setValues({ ...values, [prop]: event.target.value });
                if (event.target.value === 'F') {
                    addSolved();
                }
                break;
            case 'deadline':
                values.deadline = event.target.value;
                setValues({ ...values, [prop]: event.target.value });
                break;
            case 'related_game':
                values.related_game = event.target.value;
                setValues({ ...values, [prop]: event.target.value });

        }
        const temp = {
            id: task.id,
            data: values
        }
        updateTask(temp);
        resetTasks();
        resetStatistics();
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
    }

    const handleComment = (event) => {
        event.preventDefault();
        const temp = {
            comment: tempComment,
            user_id: user.id,
            related_task: task.id
        }
        postComment(temp);
        setTempComment('');
    }

    if (open) {
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
                                marginTop: '1rem',
                            }}
                        >
                            <Box
                                sx={{
                                    minHeight: '135px',
                                    bgcolor: '#fff',
                                    borderRadius: '8px',
                                    padding: '0.8rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                <H4>Beskrivelse</H4>
                                <CARD_TEXT sx={{marginTop: '1rem'}}>{task.description}</CARD_TEXT>
                            </Box>
                            <Box
                                sx={{
                                    minHeight: '350px',
                                    borderRadius: '8px',
                                    bgcolor: '#fff',
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
                                       <Comments /> 
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
                                width: '33%',
                                marginLeft: 'auto',
                                display:'flex',
                                flexDirection: 'column',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                marginTop: '1rem',
                                paddingLeft: '0.5rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <H4 sx={{marginBottom: '1rem'}}>Informasjon</H4>
                            <SelectContainerSmall  label="Status:" value={values.status} onChange={handleChange('status')} options={STATUS_OPTIONS} width='95%' fontSize='14px' marginRight={0} />
                            <InputContainer label="Frist:" value={values.deadline} onChange={handleChange('deadline')} width='95%' fontSize='14px' marginRight={0} type="datetime-local" />
                            { task.category === 'G'
                                ? <SelectContainerSmall label="Relatert spill:" value={values.related_game} onChange={handleChange('related_game')} options={parseGamesToOptions(games)} width='95%' fontSize='14px' marginRight={0} />
                                : null
                            }
                            <Box sx={{display:'flex', width: '95%', margin: '1rem auto'}}>
                                <BODY_BOLD>Kategori:</BODY_BOLD>
                                <Typography sx={{marginLeft:'auto', fontSize: '14px'}}>{getCategory(task.category)}</Typography>
                            </Box>
                            <Box sx={{display:'flex', width: '95%', margin: '1rem auto'}}>
                                <BODY_BOLD>Prioritet:</BODY_BOLD>
                                <Box sx={{width:'70%', marginLeft: 'auto'}}>{getPriority(task.priority)}</Box>
                            </Box>
                            
                            <Box sx={{ display:'flex', width: '95%', marginTop: 'auto', marginBottom:'0.5rem'}}>
                                <Box>
                                    <BODY_BOLD>Ansvarlig:</BODY_BOLD>
                                    <Typography sx={{fontSize:'14px'}}>{task.responsible.first_name} {task.responsible.last_name}</Typography>
                                </Box>
                                <Avatar 
                                    alt={task.responsible.username}
                                    src={task.responsible.profile_picture}
                                    sx={{width:44, height: 44, marginLeft:'auto'}}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>

        )
    } else {
        return null;
    }
}

export default TaskDetail;