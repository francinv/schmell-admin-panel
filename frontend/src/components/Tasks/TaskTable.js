import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectP, selectPageSize, selectTaskCount, selectTasks } from '../../features/tasks/taskSelectors';
import { Avatar, Box, makeStyles, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { BODY_BOLD, CARD_TEXT } from '../styles/Typography';
import { getCategory, getDate, getPriority, getTime, getUpdatedTime } from '../../utils/taskUtil';
import { resetStatus, setP, setPageSize } from '../../features/tasks/taskSlice';
import { useAppDispatch } from '../../features/hooks';
import TaskDetail from './TaskDetail';


export const CTableCell = styled(TableCell)(({theme}) => ({
    fontFamily:'Quicksand',
    fontSize:14,
    fontWeight:500,
    color: '#9FA2B4',
}))

export const DTableCell = styled(TableCell)(({theme}) => ({
    fontFamily:'Quicksand',
    fontSize:14,
    fontWeight:500,
    color: '#141400',
}))

const actionDispatch = (dispatch) => ({
    setP: (query) => dispatch(setP(query)),
    setPageSize: (query) => dispatch(setPageSize(query)),
    resetStatus: () => dispatch(resetStatus())
})
const TaskTable = () => {
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);

    }
    const { setP } = actionDispatch(useAppDispatch());
    const { setPageSize } = actionDispatch(useAppDispatch());
    const { resetStatus } = actionDispatch(useAppDispatch());
    const tasks = useSelector(selectTasks);
    const count = useSelector(selectTaskCount);
    const page_size = useSelector(selectPageSize);
    const p = useSelector(selectP);

    const handleChangePage = (event, newAlignment) => {
        resetStatus();
        setP(newAlignment + 1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        resetStatus();
        setPageSize(parseInt(event.target.value, 10));
        setP(1);
    };

    const handleClick = (task) => {
        setSelectedTask(task);
        handleShow();
    }

    return (
        <Box sx={{width: '100%'}}>
            <TableContainer>
                <Table sx={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                            <CTableCell>Oppgave detaljer</CTableCell>
                            <CTableCell>Kategori</CTableCell>
                            <CTableCell>Frist</CTableCell>
                            <CTableCell>Prioritet</CTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                hover
                                onClick={() => handleClick(task)}
                                key={task.id}
                                sx={{cursor:'pointer'}}
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
                                        <BODY_BOLD>{getDate(task.deadline)}</BODY_BOLD>
                                        <CARD_TEXT>{getTime(task.deadline)}</CARD_TEXT>
                                    </Box>
                                </TableCell>
                                <TableCell>{getPriority(task.priority)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50]}
                                count={count}
                                rowsPerPage={page_size}
                                page={p-1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{
                                    '& .MuiTablePagination-selectLabel':{
                                        fontFamily: 'Quicksand',
                                        fontSize: 14,
                                        color: '#9FA2B4'
                                    },
                                    '& .MuiTablePagination-select': {
                                        fontFamily: 'Quicksand',
                                        color: '#4B506D',
                                        fontSize: 14,
                                        fontWeight: 500,
                                    },
                                    '& .MuiTablePagination-selectIcon': {
                                        color: '#9FA2B4'
                                    },
                                    '& .MuiTablePagination-displayedRows': {
                                        fontFamily: 'Quicksand',
                                        fontSize: 14,
                                        color: '#9FA2B4'
                                    }
                                }}
                            />
                        </TableRow>
                    </TableFooter>  
                </Table>
            </TableContainer>
            <TaskDetail open={open} handleShow={handleShow} task={selectedTask}/>
        </Box>
    )
}

export default TaskTable;