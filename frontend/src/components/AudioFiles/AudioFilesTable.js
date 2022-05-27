import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../features/hooks';
import { selectAudioFiles, selectAudioFilesCount, selectAudioFilesP, selectAudioFilesPageSize } from '../../features/audiofiles/audiofileSelector';
import { deleteAudioFile, resetStatus, setP, setPageSize } from '../../features/audiofiles/audioFileSlice';
import { getGender } from '../../utils/audioFileUtil';
import DeleteDialog from '../Games/CustomComponents/DeleteDialog';


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
    deleteFile: (query) => dispatch(deleteAudioFile(query)),
    resetStatus: () => dispatch(resetStatus()),
})

const AudioFilesTable = () => {
    const { setP, setPageSize, deleteFile, resetStatus } = actionDispatch(useAppDispatch());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [idOfDeleted, setIdOfDeleted] = useState(null);
    const files = useSelector(selectAudioFiles);
    const count = useSelector(selectAudioFilesCount);
    const page_size = useSelector(selectAudioFilesPageSize);
    const p = useSelector(selectAudioFilesP);

    const handleShow = () => {
        setDialogOpen((wasOpen) => !wasOpen);
    }

    const handleChangePage = (event, newAlignment) => {
        resetStatus();
        setP(newAlignment + 1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        resetStatus();
        setPageSize(parseInt(event.target.value, 10));
        setP(1);
    };

    const handleDelete = () => {
        deleteFile(idOfDeleted);
        handleShow();
    }

    return (
        <Box sx={{width: '100%'}}>
            <TableContainer>
                <Table sx={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                            <CTableCell>Tilhørende spørsmål</CTableCell>
                            <CTableCell>Kjønn</CTableCell>
                            <CTableCell>Fil</CTableCell>
                            <CTableCell>Handlinger</CTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map(file => (
                            <TableRow
                                key={file.id}
                            >
                                <DTableCell>{file.related_question.question_desc}(id: {file.related_question.id})</DTableCell>
                                <DTableCell>{getGender(file.gender_voice)}</DTableCell>
                                <TableCell>
                                    <Link 
                                        href={file.file} 
                                        underline="hover" 
                                        target="_blank" 
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            color: '#141400',
                                        }}
                                    >Åpne fil <OpenInNewIcon sx={{marginLeft: '0.2rem'}}/></Link></TableCell>
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <IconButton 
                                        aria-label='delete' 
                                        sx={{color: '#141400'}} 
                                        onClick={() => {
                                            setIdOfDeleted(file.id);
                                            handleShow();
                                        }}><DeleteIcon /></IconButton>
                                </TableCell>
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
            <DeleteDialog open={dialogOpen} handleShow={handleShow} handleDelete={handleDelete} />
        </Box>
    )
}

export default AudioFilesTable;