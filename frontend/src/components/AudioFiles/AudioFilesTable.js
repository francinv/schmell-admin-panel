import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../features/hooks';
import { selectAudioFiles, selectAudioFilesCount, selectAudioFilesP, selectAudioFilesPageSize } from '../../features/audiofiles/audiofileSelector';
import { deleteAudioFile, setP, setPageSize } from '../../features/audiofiles/audioFileSlice';
import { getGender } from '../../utils/audioFileUtil';
import DeleteDialog from '../Dialog/DeleteDialog';
import { CTableCell, CustomFooter, DTableCell, TableHeader } from '../table/TableComponents';
import { AUDIO_TABLE_HEADERS } from '../../constants/audioFileConstants';

const actionDispatch = (dispatch) => ({
    updateP: (query) => dispatch(setP(query)),
    updatePageSize: (query) => dispatch(setPageSize(query)),
    deleteFile: (query) => dispatch(deleteAudioFile(query))
});

const AudioFilesTable = () => {
    const { updateP, updatePageSize, deleteFile } = actionDispatch(useAppDispatch());

    const [dialogOpen, setDialogOpen] = useState(false);
    const [idOfDeleted, setIdOfDeleted] = useState(null);

    const files = useSelector(selectAudioFiles);
    const count = useSelector(selectAudioFilesCount);
    const page_size = useSelector(selectAudioFilesPageSize);
    const p = useSelector(selectAudioFilesP);

    const handleShow = () => setDialogOpen((wasOpen) => !wasOpen);

    const handleChangePage = (_event, newAlignment) => updateP(newAlignment + 1);

    const handleChangeRowsPerPage = (event) => {
        updatePageSize(parseInt(event.target.value, 10));
        updateP(1);
    };

    const handleDelete = () => {
        deleteFile(idOfDeleted);
        handleShow();
    }

    return (
        <Box sx={{width: '100%'}}>
            <TableContainer>
                <Table sx={{width: '100%'}}>
                    <TableHeader>{AUDIO_TABLE_HEADERS.map(header=>(<CTableCell key={header}>{header}</CTableCell>))}</TableHeader>
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
                    <CustomFooter count={count} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} p={p} page_size={page_size} />
                </Table>
            </TableContainer>
            <DeleteDialog open={dialogOpen} handleShow={handleShow} handleDelete={handleDelete} />
        </Box>
    )
}

export default AudioFilesTable;