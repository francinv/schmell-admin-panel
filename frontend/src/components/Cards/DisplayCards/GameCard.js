import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { sortDate } from '../../../utils/dateUtil';
import { CARD_TEXT, H2 } from '../../styles/Typography';
import { deleteGame, setSelectedGame } from '../../../features/games/gameSlice';
import { useAppDispatch } from '../../../features/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCount, isGreenOrRed } from '../../../utils/gameUtil';
import { resetStatistics } from '../../../features/statistics/statisticSlice';
import DeleteDialog from '../../Dialog/DeleteDialog';
import CardContainer from '../CardContainer';

const actionDispatch = (dispatch) => ({
    setGame: (query) => dispatch(setSelectedGame(query)),
    removeGame: (query) => dispatch(deleteGame(query)),
    reset: () => dispatch(resetStatistics())
})

const GameCard = ({ game, setStage }) => {
    const [open, setOpen] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(
        {
            display:'none',
            marginLeft:'auto',
        }
    );
    const spanStyle = {
        color: 'black',
    };

    const { setGame, removeGame, reset } = actionDispatch(useAppDispatch());
    
    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    const handleClick = () => {
        setGame(game.id);
        setStage('W');
    }

    const handleDelete = () => {
        removeGame(game.id);
        reset();
    }

    return (
        <CardContainer width="30%" flexDirection="column" setButtonStyle={setButtonStyle}>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}
            >
                <H2 className="CARD_Title" sx={{marginLeft:'auto', marginRight: 'auto'}}>{game.name}</H2>
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
                    <CARD_TEXT sx={{color: isGreenOrRed(game.last_updated)}}><b><span style={spanStyle}>Sist oppdatert:</span></b> {sortDate(game.last_updated)}</CARD_TEXT>
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
        </CardContainer>
    );
}

export default GameCard;