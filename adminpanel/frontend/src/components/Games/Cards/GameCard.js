import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { sortDate } from '../../../utils/dateUtil';
import { CARD_TEXT, H2 } from '../../styles/Typography';
import { deleteGame, fetchGame, fetchGamesFromServer, fetchWeeks } from '../../../core/APIfunctions';
import { setGames, setSelectedGame, setWeeks } from '../../../features/games/gameSlice';
import { useAppDispatch } from '../../../features/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectGames } from '../../../features/selectors';
import { useSelector } from 'react-redux';
import { getCountOfQuestions } from '../../../utils/gameUtil';

const actionDispatch = (dispatch) => ({
    setSelectedGame: (query) => dispatch(setSelectedGame(query)),
    setWeeks: (query) => dispatch(setWeeks(query)),
    setGames: (query) => dispatch(setGames(query))
})

const GameCard = ({game, setStage}) => {
    const { setSelectedGame } = actionDispatch(useAppDispatch());
    const { setWeeks } = actionDispatch(useAppDispatch());
    const { setGames } = actionDispatch(useAppDispatch());
    var [count, setCount] = useState(0);
    const games = useSelector(selectGames);
    
    useEffect(() => {
        getCount();
    }, [count])
    
    const [buttonStyle, setButtonStyle] = useState(
        {
            display:'none',
            marginLeft:'auto',
        }
    );

    async function getCount(){
        const temp = await getCountOfQuestions(game);
        setCount(temp);
    }


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

    const handleClick = async () => {
        const tempGame = await fetchGame(game.name);
        setSelectedGame(tempGame[0]);
        setWeeks(await fetchWeeks(game.id));
        setStage('W');
    }

    const handleDelete = async () => {
        const initialGames = games;
        deleteGame(game.id);
        setGames(await fetchGamesFromServer());
        if (initialGames === games) {
            setGames(await fetchGamesFromServer());
        }
    }

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
                <IconButton onClick={handleDelete} sx={{color:'#141400'}} style={buttonStyle}>
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
                    <CARD_TEXT><b>Antall spørsmål:</b> {count}</CARD_TEXT>
                    <CARD_TEXT><b>Sist oppdatert:</b> <CARD_TEXT sx={{color: isGreenOrRed()}}>{sorted_Date}</CARD_TEXT></CARD_TEXT>
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

        </Box>
    );
}

export default GameCard;