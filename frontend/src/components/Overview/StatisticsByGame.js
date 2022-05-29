import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectGames } from "../../features/games/gameSelectors";
import { selectCountByGame } from "../../features/statistics/statisticSelectors";
import { money, users } from "../../constants/statistics";
import { spanStyle } from "../styles/spanStyle";
import { getColorBasedOnValue } from "../../utils/overviewUtil";

const StatisticsByGame = () => {

    const games = useSelector(selectGames);
    const countByGame = useSelector(selectCountByGame);

    const getCountByGame = idGame => countByGame['N'+idGame];

    return (
        <TableContainer sx={{marginTop: '0.2rem'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Spill</TableCell>
                        <TableCell align="right">Antall Spørsmål</TableCell>
                        <TableCell align="right">Brukere (uke)</TableCell>
                        <TableCell align="right">Inntekt (måned)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.map((game) => (
                        <TableRow key={game.id}>
                            <TableCell padding="none">{game.name}</TableCell>
                            <TableCell align="right">{getCountByGame(game.id)}</TableCell>
                            <TableCell align="right" sx={{color: getColorBasedOnValue(users)}}><span style={spanStyle}>20</span> (+1)</TableCell>
                            <TableCell align="right" sx={{color: getColorBasedOnValue(money)}}><span style={spanStyle}>50</span> (+50)</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default StatisticsByGame;
