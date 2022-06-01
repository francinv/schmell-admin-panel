import React, { useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box } from "@mui/material";
import { H3 } from "../styles/Typography";
import { useAppDispatch } from "../../features/hooks";
import { resetStatus, setQuestion } from "../../features/audiofiles/audioFileSlice";
import { useSelector } from "react-redux";
import { selectAudioFilesQuestion } from "../../features/audiofiles/audiofileSelector";
import UploadAudioFile from "../Overlays/CreateOverlays/UploadAudioFile";
import BtnAdd from "../Buttons/BtnAdd";
import InputField from "../form/input/InputField";
import { StyledOuterContainer } from "../styles/Containers";

const actionDispatch = (dispatch) => ({
    updateSearchValue: (query) => dispatch(setQuestion(query)),
    resetFiles: () => dispatch(resetStatus())
})

const AudioFilesHeader = () => {
    const {updateSearchValue, resetFiles} = actionDispatch(useAppDispatch());
    const searchValue = useSelector(selectAudioFilesQuestion);

    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    const handleChange = (event) => {
        event.preventDefault();
        resetFiles();
        updateSearchValue(event.target.value);
    };

    return (
        <StyledOuterContainer>
            <H3>Alle filer</H3>
            <Box
                sx={{
                    width: '100%',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    display:'flex',
                    justifyContent: 'space-between'
                }}
            >
                <BtnAdd handleClick={handleShow} borderRadius="8px" btnText="Last opp fil" endIcon={<AddCircleOutlineOutlined />}/>
                <InputField value={searchValue} onChange={handleChange} placeholder="Søk etter spesifikt spørsmål, for å finne korresponderende fil" 
                    type="text" height="36px" fontSize="18px" />
            </Box>
            <UploadAudioFile handleClose={handleShow} open={open}/>
        </StyledOuterContainer>
    )
}

export default AudioFilesHeader;