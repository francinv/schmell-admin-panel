import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortGames } from "../../utils/sortUtil";
import { fetchGames } from "../../features/games/gameSlice";
import { selectGames, selectGameStatus } from "../../features/games/gameSelectors";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";
import GameCard from "../Cards/DisplayCards/GameCard";
import CreateGame from "../Cards/CreateCards/CreateGame";
import AddGame from "../Overlays/CreateOverlays/CreateGame";

const GameOverview = ({ setStage }) => {
    const [open, setOpen] = useState(false);
    const games = useSelector(selectGames);
    const gameStatus = useSelector(selectGameStatus);
    const dispatch = useDispatch();

    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    useEffect(() => {
        if (gameStatus === 'idle') {
            dispatch(fetchGames())
        }
    }, [games, gameStatus])
    
    return (
        <ContentWrapper pageTitle={"Spill"}>
            <InnerWrapper>
                {sortGames(games).map((game) => (
                    <GameCard game={game} key={game.id} setStage={setStage} />
                ))}
                    <CreateGame handleOpen={handleShow} />
                    <AddGame open={open} handleClose={handleShow} />
            </InnerWrapper>
        </ContentWrapper>
    );
};

export default GameOverview;