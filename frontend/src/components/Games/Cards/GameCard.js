import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { sortDate } from '../../../utils/dateUtil';
import { CARD_TEXT, H2 } from '../../styles/Typography';
import { deleteGame, setSelectedGame } from '../../../features/games/gameSlice';
import { useAppDispatch } from '../../../features/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCount } from '../../../utils/gameUtil';
import { resetStatistics } from '../../../features/statistics/statisticSlice';
import DeleteDialog from '../CustomComponents/DeleteDialog';

const actionDispatch = (dispatch) => ({
    setSelectedGame: (query) => dispatch(setSelectedGame(query)),
    deleteGame: (query) => dispatch(deleteGame(query)),
    resetStatistics: () => dispatch(resetStatistics())
})

const GameCard = ({game, setStage}) => {
    const { setSelectedGame } = actionDispatch(useAppDispatch());
    const { deleteGame } = actionDispatch(useAppDispatch());
    const { resetStatistics } = actionDispatch(useAppDispatch());

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

    let sorted_Date = sortDate(game.last_updated);
    let related = game.related_questions ? "Ja" : "Nei";

    function isGreenOrRed() {
        const actual = new Date(game.last_updated);
        const limit = new Date(Date.now() - 12096e5);
        let color = '#fff';
        if (actual < limit) {
            color = '#FF0000';
        } else {
            color = '#008000';
        }
        return color;
    }

    const handleClick = () => {
        setSelectedGame(game.id);
        setStage('W');
    }

    const handleDelete = () => {
        deleteGame(game.id);
        resetStatistics();
    }

    const spanStyle = {
        color: 'black',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                bgcolor:'#F3F3F4',
                margin: '1rem',
                borderRadius: '8px',
                transition: 'background-color 400ms linear',
                '&:hover': {
                    bgcolor: '#9FA2B4',
                },
                '&:hover .Game_CARD_Title': {
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
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <H2 className="Game_CARD_Title" sx={{marginLeft:'auto', marginRight: 'auto'}}>{game.name}</H2>
                <IconButton onClick={handleShow} sx={{color:'#141400'}} style={buttonStyle}>
                    <DeleteIcon style={{fontSize: 24}} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    cursor: 'pointer',
                }}
                onClick = {handleClick}
            >
                <Box
                    sx={{
                        width:'50%',
                        paddingTop:'0.5rem',
                        paddingLeft: '0.5rem',
                    }}
                    className='container_game_card'
                >
                    <CARD_TEXT><b>Antall spørsmål:</b> {getCount(game.id)}</CARD_TEXT>
                    <CARD_TEXT sx={{color: isGreenOrRed()}}><b><span style={spanStyle}>Sist oppdatert:</span></b> {sorted_Date}</CARD_TEXT>
                    <CARD_TEXT><b>Relaterte oppgaver:</b> {related}</CARD_TEXT>
                    <CARD_TEXT><b>Antall brukere (totalt):</b> 232</CARD_TEXT>
                </Box>
                <Box
                    sx={{
                        width:'50%',
                    }}
                >
                    <img src={game.logo} width={'100%'}></img>
                </Box>
            </Box>
            <DeleteDialog open={open} handleShow={handleShow} handleDelete={handleDelete} />
        </Box>
    );
}

export default GameCard;