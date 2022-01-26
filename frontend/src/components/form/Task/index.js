import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import { Avatar, Box, Button, IconButton, MenuItem, Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CustomContainerForm, CustomWidthText } from '../index';
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../features/user/userSelectors";
import { selectGames } from "../../../features/games/gameSelectors";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({them})=> ({
    width: '70%',
    height: '29px',
}))

export const SelectStatus = ({label, value, onChange}) => {

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <FormControl 
                fullWidth 
                sx={{
                    width: '70%',
                    height: '29px',
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
        </CustomContainerForm>
    )
}

export const SelectCategory = ({label, value, onChange}) => {

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <FormControl 
                fullWidth 
                sx={{
                    width: '70%',
                    height: '29px',
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
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'G'}>Spill</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'D'}>Development</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'W'}>Design</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'M'}>Markedsføring</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'E'}>Økonomi</MenuItem>
                </Select>
            </FormControl>
        </CustomContainerForm>
    )
}

export const TogglePriority = ({label, onChange}) => {
    const [alignment, setAlignment] = useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        onChange(event);
    }

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <CustomToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton
                    value={3}
                    sx={{
                        borderRadius: '8px',
                        width: '33.333%',
                        fontFamily: 'Quicksand',
                        fontSize: '14px',
                        color: '#fff',
                        backgroundColor:'#FEC400',
                        opacity: 0.5,
                        '&.Mui-selected': {
                            color: '#fff',
                            backgroundColor:'#FEC400',
                            opacity: 1,
                        },
                        '&:hover': {
                            backgroundColor:'#FEC400',
                            color: '#fff',
                            opacity: 0.75,
                        },
                    }}
                >
                    LAV
                </ToggleButton>
                <ToggleButton
                    value={2}
                    sx={{
                        borderRadius: '8px',
                        width: '33.333%',
                        fontFamily: 'Quicksand',
                        fontSize: '14px',
                        color: '#fff',
                        backgroundColor:'#29CC97',
                        opacity: 0.5,
                        '&.Mui-selected': {
                            color: '#fff',
                            backgroundColor:'#29CC97',
                            opacity: 1,
                        },
                        '&:hover': {
                            backgroundColor:'#29CC97',
                            color: '#fff',
                            opacity: 0.75,
                        },
                    }}
                >
                    MEDIUM
                </ToggleButton>
                <ToggleButton
                    value={1}
                    sx={{
                        borderRadius: '8px',
                        width: '33.333%',
                        fontFamily: 'Quicksand',
                        fontSize: '14px',
                        color: '#fff',
                        backgroundColor:'#F12B2C',
                        opacity: 0.5,
                        '&.Mui-selected': {
                            color: '#fff',
                            backgroundColor:'#F12B2C',
                            opacity: 1,
                        },
                        '&:hover': {
                            backgroundColor:'#F12B2C',
                            color: '#fff',
                            opacity: 0.75,
                        },
                    }}
                >
                    HØY
                </ToggleButton>
            </CustomToggleButtonGroup>
        </CustomContainerForm>
    )
}

export const TogglePerson = ({label, value, setValue}) => {
    const users = useSelector(selectAllUsers);

    function getOpacity(current_val){
        let opacity = '0.5';
        if (value === current_val) {
            opacity='1';
        }
        else {
            opacity = '0.5';
        }
        return opacity;
    }

    const handleChange = (newAlignment) => {
        setValue(newAlignment);
    }

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
                <Box
                    sx={{
                        width: '70%',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    {users.map((user) => (
                        <IconButton
                            key={user.id}
                            sx={{
                                marginLeft: '0.2rem',
                                marginRight: '0.2rem',
                                opacity: getOpacity(user.id)
                            }}
                            onClick={() => handleChange(user.id)}
                        >
                            <Avatar
                                alt={user.username}
                                src={user.profile_picture}
                                sx={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </IconButton>
                    ))}
                </Box>
        </CustomContainerForm>
    )
}

export const SelectRelatedGame = ({label, value, onChange, category}) => {
    const games = useSelector(selectGames);

    if (category === 'G') {
        return(
            <CustomContainerForm>
                <CustomWidthText>{label}</CustomWidthText>
                <FormControl 
                    fullWidth 
                    sx={{
                        width: '70%',
                        height: '29px',
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
                        <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value=''>Velg spill</MenuItem>
                        {games.map((game) => (
                            <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={game.id} key={game.id}>{game.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CustomContainerForm>
        )
    }
    else {
        return null;
    }
}