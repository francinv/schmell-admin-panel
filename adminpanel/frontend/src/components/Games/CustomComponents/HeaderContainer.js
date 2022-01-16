import React, { useState } from "react";
import { Box, Button, FormControl, IconButton, InputBase, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { selectedGame } from "../../../features/selectors";
import { BODY_BOLD, CARD_TEXT } from "../../styles/Typography";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from "@mui/system";
import { fetchGame, fetchGamesFromServer, postImage, putNewDescription, putNewStatus, updateGame } from "../../../core/APIfunctions";
import { ImageUploadChange, InputTextAreaDescription } from "../../form";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { setGames, setSelectedGame } from "../../../features/games/gameSlice";
import { useAppDispatch } from "../../../features/hooks";
import CreateQuestionForm from "../CreateQuestion";

const actionDispatch = (dispatch) => ({
    setGames: (query) => dispatch(setGames(query)),
    setSelectedGame: (query) => dispatch(setSelectedGame(query)),
})

export const HeaderQuestionsComponent = ({handleOpen}) => {
    const game = useSelector(selectedGame);
    const [stateChange, setStateChange] = useState(false);

    const [status, setStatus] = useState(game.status);

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
        const temp = {"status": event.target.value};
        putNewStatus(temp, game.id);
    };

    const CustomInput = styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
            paddingLeft: '0.5rem',
        },
    }));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '95%',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            {
                stateChange
                ? <ChangeDescLogo setStateChange={setStateChange} game={game} />
                : <BeforeChange setStateChange={setStateChange} game={game} />
            }
                
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                    alignSelf: 'flex-end',
                }}
            >
                <Button
                    sx={{
                        bgcolor: '#e0e000',
                        fontFamily: 'Quicksand',
                        fontSize: 14,
                        fontWeight: 700,
                        height: '29px',
                        color: '#141400',
                        borderRadius: '8px 0px 0px 0px',
                    }}
                    endIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleOpen}
                >
                    Opprett spørsmål
                </Button>
                <FormControl
                    sx={{
                        height: '29px',
                        '& .MuiInputBase-root': {
                            borderRadius: '0px 8px 0px 0px',
                        },
                    }}
                >
                    <Select
                        value={status}
                        onChange={handleSelectChange}
                        style={{
                            fontFamily: 'Quicksand',
                            color: '#141400',
                            fontSize: 14,
                        }}
                        sx={{
                            height: '29px',
                            color: '#141400',
                            bgcolor: '#E5E5E5',
                        }}
                        input={<CustomInput />}

                    >
                        <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'D'}>Development</MenuItem>
                        <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'R'}>Ready</MenuItem>
                        <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'P'}>Deployed</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

const BeforeChange = ({setStateChange, game}) => {

    return (
        <Box
            sx={{
                display:'flex',
                flexDirection: 'row',
                width: '50%',
                bgcolor: '#E5E5E5',
                borderRadius: '8px 8px 0px 0px',
                minHeight: '100px',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    width: '70%',
                    padding: '0.5rem',
                }}
            >
                <BODY_BOLD>Beskrivelse:</BODY_BOLD>
                <CARD_TEXT>{game.description}</CARD_TEXT>
            </Box>
            <img src={game.logo} alt="Logo of game" height="100" />
            <IconButton
                sx=
                {{
                    color:'#141400',
                    alignSelf: 'flex-start',
                    marginLeft: 'auto',
                    
                }} 
                onClick={() => setStateChange(true)}
            >
                <EditOutlinedIcon />
            </IconButton>
        </Box>
    );
}

const ChangeDescLogo = ({setStateChange, game}) => {
    const { setGames } = actionDispatch(useAppDispatch());
    const { setSelectedGame } = actionDispatch(useAppDispatch());
    const [description, setDescription] = useState(game.description);
    const [fileState, setFileState] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        setFileState(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const initialGame = game;
        putNewDescription({"description": description}, game.id);
        var data = new FormData();
        data.append("logo", fileState);
        postImage(game.id, data);
        const tempGame = await fetchGame(game.name);
        setSelectedGame(tempGame[0]);
        if (game === initialGame) {
            const tempGame = await fetchGame(game.name);
            setSelectedGame(tempGame[0]); 
        }
        const today = new Date().toISOString().split('T')[0];
        updateGame({last_updated: today}, game.id);
        setGames(await fetchGamesFromServer()); 
        setStateChange(false);
    }

    return (
        <Box
            sx={{
                display:'flex',
                flexDirection: 'row',
                width: '50%',
                bgcolor: '#fff',
                borderRadius: '8px 8px 0px 0px',
                minHeight: '100px',
            }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    width: '70%',
                    padding: '0.5rem',
                }}
            >
                <InputTextAreaDescription onChange={handleChange} label={"Endre beskrivelse:"} value={description}/>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    padding: '0.5rem',
                }}
            >
                <ImageUploadChange fileState={fileState} handleFileChange={handleFileChange} label={"Endre logo:"} placeholder={"Last opp"}/>
            </Box>
            <IconButton
                type="submit"
                sx=
                {{
                    color:'#141400',
                    alignSelf: 'flex-start',
                    marginLeft: 'auto',
                }} 
            >
                <CloudUploadIcon />
            </IconButton>
        </Box>
    );
}

