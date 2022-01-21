import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import CreateGameForm from "./CreateGame";
import GameCard from "./Cards/GameCard";
import { useDispatch, useSelector } from "react-redux";
import { selectGames, selectGameStatus } from "../../features/selectors";
import { CreateGameCard } from "./CustomComponents/CreateGameCard";
import { sortGames } from "../../utils/sortUtil";
import { fetchGames } from "../../features/games/gameSlice";

export const GameOverview = ({setStage}) => {
    const games = useSelector(selectGames);
    const gameStatus = useSelector(selectGameStatus);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (gameStatus === 'idle') {
            dispatch(fetchGames())
          }
    }, [games, gameStatus])
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Spill"} sub_title={undefined}/>
            <Box
                sx={{
                    width:'95%',
                    display:'flex',
                    bgcolor:'#fff',
                    flexWrap:'wrap',
                    marginTop:'50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '8px',
                    justifyContent: 'center',
                }}
            >
                {sortGames(games).map((game) => (
                    <GameCard game={game} key={game.id} setStage={setStage}/>
                ))}
                    <CreateGameCard handleOpen={handleOpen}/>
                    <CreateGameForm open={open} handleOpen={handleOpen} handleClose={handleClose}/>
            </Box>
        </Box>
    )
}

export default GameOverview;