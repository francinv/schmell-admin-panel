import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { H2 } from '../../styles/Typography';
import { useAppDispatch } from '../../../features/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteWeek, setSelectedWeek } from '../../../features/weeks/weekSlice';
import DeleteDialog from '../CustomComponents/DeleteDialog';

const actionDispatch = (dispatch) => ({
    deleteWeek: (query) => dispatch(deleteWeek(query)),
    setWeek: (query) => dispatch(setSelectedWeek(query))
})

const WeekCard = ({week, setStage}) => {
    const { deleteWeek } = actionDispatch(useAppDispatch());
    const { setWeek } = actionDispatch(useAppDispatch());

    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    const [buttonStyle, setButtonStyle] = useState(
        {
            display:'none',
            marginLeft:'auto',
        }
    );

    const handleClick = () => {
        setWeek(week.id);
        setStage('Q');
    }

    const handleDelete = () => {
        deleteWeek(week.id);
    }
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '20%',
                bgcolor:'#F3F3F4',
                margin: '1rem',
                borderRadius: '8px',
                transition: 'background-color 400ms linear',
                '&:hover': {
                    bgcolor: '#9FA2B4',
                },
                '&:hover .Week_CARD_Title': {
                    color:'#e0e000',
                }
            }}
            onMouseEnter={e => {
                setButtonStyle({display: 'block'});
            }}
            onMouseLeave={e => {
                setButtonStyle({display: 'none'})
            }}
            
        >
            <Box
                sx={{
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                onClick = {handleClick}
            >
                <H2 className="Week_CARD_Title">Uke {week.week_number}</H2>
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

        </Box>
    );
}

export default WeekCard;