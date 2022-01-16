import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { H2 } from '../../styles/Typography';
import { deleteWeek, fetchGame, fetchQuestions, fetchWeek, fetchWeeks } from '../../../core/APIfunctions';
import { setQuestions, setSelectedWeek, setWeeks } from '../../../features/games/gameSlice';
import { useAppDispatch } from '../../../features/hooks';
import { useSelector } from 'react-redux';
import { selectedGame, selectWeeks } from '../../../features/selectors';
import DeleteIcon from '@mui/icons-material/Delete';

const actionDispatch = (dispatch) => ({
    setSelectedWeek: (query) => dispatch(setSelectedWeek(query)),
    setQuestions: (query) => dispatch(setQuestions(query)),
    setWeeks: (query) => dispatch(setWeeks(query)),
})

const WeekCard = ({week, setStage}) => {
    const { setSelectedWeek } = actionDispatch(useAppDispatch());
    const { setQuestions } = actionDispatch(useAppDispatch());
    const { setWeeks } = actionDispatch(useAppDispatch());
    const weeks = useSelector(selectWeeks);
    const game = useSelector(selectedGame);

    const [buttonStyle, setButtonStyle] = useState(
        {
            display:'none',
            marginLeft:'auto',
        }
    );

    const handleClick = async () => {
        setSelectedWeek(await fetchWeek(week.id));
        setQuestions(await fetchQuestions(week.id));
        setStage('Q');
    }

    const handleDelete = async () => {
        const initialWeeks = weeks;
        deleteWeek(week.id);
        setWeeks(await fetchWeeks(game.id));
        if (initialWeeks === weeks) {
            setWeeks(await fetchWeeks(game.id));
        }
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
                onClick={handleDelete} 
                sx={{
                    color:'#141400',
                }} 
                style={buttonStyle}>
                <DeleteIcon style={{fontSize: 16}} />
            </IconButton>

        </Box>
    );
}

export default WeekCard;