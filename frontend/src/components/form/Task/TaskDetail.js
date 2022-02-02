import React from "react";
import { Box, FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from "react-redux";
import { selectGames } from '../../../features/games/gameSelectors';
import { BODY_BOLD } from "../../styles/Typography";

export const UpdateSelectStatus = ({value, onChange}) => {

    return(
        <FormControl 
            fullWidth 
            sx={{
                width: '70%',
                height: '29px',
                marginLeft: 'auto'
            }}
        >
            <Select
                value={value}
                onChange={onChange}
                style={{
                    fontFamily: 'Quicksand',
                    color: '#000',
                    fontSize: 14,
                }}
                sx={{
                    borderRadius: '8px',
                    height: '29px',
                    bgcolor: '#E5E5E5',
                    '&.Mui-focused' : {
                        borderColor: '#000',
                    },
                }}
            >
                <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'P'}>Ikke startet</MenuItem>
                <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'D'}>Startet</MenuItem>
                <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'F'}>Fullført</MenuItem>
            </Select>
        </FormControl>
    )
}

export const UpdateDateTime = ({onChange, value}) => {

    return(
        <FormControl 
            fullWidth 
            sx={{
                width: '70%',
                height: '29px',
                marginLeft: 'auto',
            }}
        >
            <OutlinedInput
                value={value}
                onChange={onChange}
                endAdornment={<InputAdornment position='end'><AccessTimeIcon /></InputAdornment>}
                type='datetime-local'
                style={{
                    fontFamily: 'Quicksand',
                    color: '#000',
                    fontSize: 14,
                    height: '29px',
                }}
                sx={{
                    borderRadius: '8px',
                    bgcolor: '#E5E5E5',
                    height: '29px',
                    '&.Mui-focused' : {
                        borderColor: '#000',
                    },
                }}
            />
        </FormControl>
    )
}

export const UpdateSelectGame = ({onChange, value, category, label}) => {
    const games = useSelector(selectGames);

    if (category === 'G') {
        return(
            <Box sx={{display:'flex', width: '95%', marginTop: '0.8rem', marginBottom: '0.8rem'}}>
                <BODY_BOLD>{label}</BODY_BOLD>
                <FormControl 
                    fullWidth 
                    sx={{
                        width: '70%',
                        height: '29px',
                        marginLeft: 'auto'
                    }}
                >
                    <Select
                        value={value}
                        onChange={onChange}
                        style={{
                            fontFamily: 'Quicksand',
                            color: '#000',
                            fontSize: 14,
                        }}
                        sx={{
                            borderRadius: '8px',
                            height: '29px',
                            bgcolor: '#E5E5E5',
                            '&.Mui-focused' : {
                                borderColor: '#000',
                            },
                        }}
                    >
                        {games.map((game) => (
                            <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={game.id} key={game.id}>{game.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        )
    }
    else {
        return null;
    }
}