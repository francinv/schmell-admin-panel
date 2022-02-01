import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectGames } from "../../features/games/gameSelectors";
import { selectCountByGame } from "../../features/statistics/statisticSelectors";


export default function GameStatisticsTable() {
    const games = useSelector(selectGames);
    const count_by_game = useSelector(selectCountByGame);
    function getCount(idGame) {  
        return count_by_game['N'+idGame];
    }
    const users = 1;
    const money = 50;


    const spanStyle = {
        color: 'black',
    };

    function isGreenOrRed(value) {
        if (value > 0) {
            return '#008000';
        } else {
            return '#FF0000'
        }
    }
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
                            <TableCell align="right">{getCount(game.id)}</TableCell>
                            <TableCell align="right" sx={{color: isGreenOrRed(users)}}><span style={spanStyle}>20</span> (+1)</TableCell>
                            <TableCell align="right" sx={{color: isGreenOrRed(money)}}><span style={spanStyle}>50</span> (+50)</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}
