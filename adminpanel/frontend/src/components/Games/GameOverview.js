import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { H2 } from "../styles/Typography";
import CreateGameForm from "./CreateGame";
import GameCard from "./Cards/GameCard";
import { useSelector } from "react-redux";
import { selectGames } from "../../features/selectors";
import { CreateGameCard } from "./CustomComponents/CreateGameCard";

export const GameOverview = ({setStage}) => {
    const games = useSelector(selectGames);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    function getSortedGames(games) {
        let tempGames = games.slice();
        var arr = tempGames.sort((a,b) => {
            return a.id - b.id;
        })
        return arr;
    }


    
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
                {getSortedGames(games).map((game) => (
                    <GameCard game={game} key={game.id} setStage={setStage}/>
                ))}
                    <CreateGameCard handleOpen={handleOpen}/>
                    <CreateGameForm open={open} handleOpen={handleOpen} handleClose={handleClose}/>
            </Box>
        </Box>
    )
}

export default GameOverview;