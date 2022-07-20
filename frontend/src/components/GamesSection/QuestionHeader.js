import React, { useState } from "react";
import { Box, FormControl, IconButton, InputBase, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { BODY_BOLD, CARD_TEXT } from "../styles/Typography";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { styled } from "@mui/system";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch } from "../../features/hooks";
import { putStatus, updateGame } from '../../features/games/gameSlice';
import { selectedGame } from '../../features/games/gameSelectors';
import BtnAdd from "../Buttons/BtnAdd";
import { ColTextAreaContainer, FileColContainer } from "../form";

const actionDispatch = (dispatch) => ({
    editStatus: (query) => dispatch(putStatus(query)),
    putGame: (query) => dispatch(updateGame(query))
})

const ContentWrapper = styled(Box)(({ _theme }) => ({
    display:'flex',
    flexDirection: 'row',
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: '8px 8px 0px 0px',
    minHeight: '100px',
}));

const InnerContainer = styled(Box)(({ _theme }) => ({
    display:'flex',
    flexDirection: 'column',
    width: '70%',
    padding: '0.5rem',
}));

const QuestionHeader = ({handleOpen, handleJsonShow}) => {
    const game = useSelector(selectedGame);
    const { editStatus } = actionDispatch(useAppDispatch());
    const [stateChange, setStateChange] = useState(false);

    const [status, setStatus] = useState(game.status);

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
        editStatus({
            id: game.id,
            content: event.target.value
        });
    };

    const CustomInput = styled(InputBase)(({ _theme }) => ({
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
                ? <EditState setStateChange={setStateChange} game={game} />
                : <DisplayState setStateChange={setStateChange} game={game} />
            }
                
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 'auto',
                    alignSelf: 'flex-end',
                }}
            >
                <BtnAdd 
                    handleClick={handleJsonShow}
                    borderRadius="8px 0px 0px 0px"
                    btnText="Last opp et sett"
                    endIcon={<NoteAddIcon />}
                />

                <BtnAdd
                    handleClick={handleOpen}
                    borderRadius="0px"
                    btnText="Legg til spørsmål"
                    endIcon={<AddCircleOutlineOutlinedIcon />}
                />
                <FormControl
                    sx={{
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
                            height: '100%',
                        }}
                        sx={{
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

const DisplayState = ({setStateChange, game}) => {

    return (
        <ContentWrapper>
            <InnerContainer>
                <BODY_BOLD>Beskrivelse:</BODY_BOLD>
                <CARD_TEXT>{game.description}</CARD_TEXT>
            </InnerContainer>
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
        </ContentWrapper>
    );
}

const EditState = ({setStateChange, game}) => {
    const [description, setDescription] = useState(game.description);
    const [fileState, setFileState] = useState('');

    const { putGame } = actionDispatch(useAppDispatch());

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
        let formData = new FormData();
        formData.append('description', description);
        formData.append('last_updated', new Date().toISOString().split('T')[0]);
        formData.append("logo", fileState);
        putGame({id: game.id, data: formData});
        setStateChange(false);
    }

    return (
        <ContentWrapper component="form" onSubmit={handleSubmit}>
            <InnerContainer>
                <ColTextAreaContainer onChange={handleChange} label={"Endre beskrivelse:"} value={description} />
            </InnerContainer>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'column',
                    padding: '0.5rem',
                }}
            >
                <FileColContainer fileState={fileState} handleFileChange={handleFileChange} label="Endre logo:" placeholder="Last opp" />
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
        </ContentWrapper>
    );
}

export default QuestionHeader;