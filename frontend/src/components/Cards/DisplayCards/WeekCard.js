import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { H2 } from '../../styles/Typography';
import { useAppDispatch } from '../../../features/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWeek, setSelectedWeek } from '../../../features/weeks/weekSlice';
import DeleteDialog from '../../Dialog/DeleteDialog';
import CardContainer from '../CardContainer';

const actionDispatch = (dispatch) => ({
    deleteWeek: (query) => dispatch(deleteWeek(query)),
    setWeek: (query) => dispatch(setSelectedWeek(query))
})

const WeekCard = ({week, setStage}) => {
    const [open, setOpen] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(
        {
            display:'none',
            marginLeft:'auto',
        }
    );

    const { deleteWeek, setWeek } = actionDispatch(useAppDispatch());

    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    const handleClick = () => {
        setWeek(week.id);
        setStage('Q');
    }

    const handleDelete = () => {
        deleteWeek(week.id);
    }
    
    return (
        <CardContainer width="20%" flexDirection="row" setButtonStyle={setButtonStyle}>
            <Box
                sx={{
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                onClick = {handleClick}
            >
                <H2 className="CARD_Title">Uke {week.week_number}</H2>
            </Box>
            <IconButton 
                onClick={handleShow} 
                sx={{
                    color:'#141400',
                }} 
                style={buttonStyle}>
                <DeleteIcon style={{fontSize: 16}} />
            </IconButton>
            <DeleteDialog open={open} handleDelete={handleDelete} handleShow={handleShow} />
        </CardContainer>
    );
}

export default WeekCard;