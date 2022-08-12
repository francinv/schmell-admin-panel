import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectP, selectPageSize, selectSelectedTask, selectTaskCount, selectTasks } from '../../features/tasks/taskSelectors';
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { BODY_BOLD, CARD_TEXT } from '../styles/Typography';
import { getCategory, getPriority, getUpdatedTime } from '../../utils/taskUtil';
import { resetStatus, setP, setPageSize, setSelected } from '../../features/tasks/taskSlice';
import { fetchComments } from '../../features/comments/commentSlice';
import { useAppDispatch } from '../../features/hooks';
import TaskDetail from '../Overlays/DisplayOverlays/TaskDetail';
import { TASK_TABLE_HEADER } from '../../constants/taskConstants';
import { CTableCell, CustomFooter, DTableCell, TableHeader } from '../table/TableComponents';
import { getDateFromDate, getTimeFromDate } from '../../utils/dateUtil';

const actionDispatch = (dispatch) => ({
    updateP: (query) => dispatch(setP(query)),
    updatePageSize: (query) => dispatch(setPageSize(query)),
    reset: () => dispatch(resetStatus()),
    getComments: (query) => dispatch(fetchComments(query)),
    setSelectedTask: (query) => dispatch(setSelected(query))
});

const TaskTable = () => {
    const [open, setOpen] = useState(false);

    const { updateP, updatePageSize, reset, getComments, setSelectedTask } = actionDispatch(useAppDispatch());
    
    const tasks = useSelector(selectTasks);
    const count = useSelector(selectTaskCount);
    const page_size = useSelector(selectPageSize);
    const p = useSelector(selectP);
    const activeTask = useSelector(selectSelectedTask);
    
    const isFinished = (task) => task.status === 'F';

    const handleShow = () => setOpen((wasOpen) => !wasOpen);

    const handleChangePage = (_event, newAlignment) => {
        reset();
        updateP(newAlignment + 1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        reset();
        updatePageSize(parseInt(event.target.value, 10));
        updateP(1);
    };

    const handleClick = (task) => {
        setSelectedTask(task);
        getComments(task.id);
        handleShow();
    };

    return (
        <Box sx={{width: '100%'}}>
            <TableContainer>
                <Table sx={{width: '100%'}}>
                    <TableHeader>{TASK_TABLE_HEADER.map(content => (<CTableCell key={content}>{content}</CTableCell>))}</TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                hover
                                onClick={() => handleClick(task)}
                                key={task.id}
                                sx={{
                                    cursor:'pointer',
                                    opacity: isFinished(task) ? 0.5 : 1.0,
                                }}
                            >
                                <TableCell sx={{display:'flex'}}>
                                    <Avatar 
                                        alt={task.responsible.username}
                                        src={task.responsible.profile_picture}
                                        sx={{width:44, height:44}}
                                    />
                                    <Box sx={{marginLeft:'0.5rem'}}>
                                        <BODY_BOLD>{task.title}</BODY_BOLD>
                                        <CARD_TEXT sx={{color: '#C5C7CD'}}>{getUpdatedTime(task.updated)}</CARD_TEXT>
                                    </Box>
                                </TableCell>
                                <DTableCell>{getCategory(task.category)}</DTableCell>
                                <TableCell>
                                    <Box sx={{display:'flex', flexDirection:'column'}}>
                                        <BODY_BOLD>{getDateFromDate(task.deadline)}</BODY_BOLD>
                                        <CARD_TEXT>{getTimeFromDate(task.deadline)}</CARD_TEXT>
                                    </Box>
                                </TableCell>
                                <TableCell>{getPriority(task.priority)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <CustomFooter count={count} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} p={p} page_size={page_size} />
                </Table>
            </TableContainer>
            { activeTask.id ? <TaskDetail open={open} handleShow={handleShow} /> : null }
        </Box>
    )
}

export default TaskTable;