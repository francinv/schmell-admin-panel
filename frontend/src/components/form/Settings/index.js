import React from "react";
import { Box, Button, FormControl, FormControlLabel, IconButton, OutlinedInput, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IOSSwitch } from "./Switch";

const FormText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Quicksand',
    fontSize: 16,
    fontWeight: 500,
    width: '25%',
    marginRight: '0.8rem',
}));

const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    marginTop: '1rem',
    marginBottom:'1rem',
    alignItems: 'center',
}));

export const ProfileInput = ({label, value, onChange, type, handleSubmit, onStateChange}) => {

    const handleCompSubmit = (event) => {
        event.preventDefault();
        onStateChange(false);
        handleSubmit();
    }
    return(
        <FormContainer component="form" onSubmit={handleCompSubmit}>
            <FormText>{label}</FormText>
            <FormControl 
                fullWidth 
                sx={{
                    width: '55%',
                    height: '29px',
                    marginLeft: '1rem',
                }}
            >
                <OutlinedInput
                    value={value}
                    onChange={onChange}
                    required
                    type={type}
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#000',
                        fontSize: 14,
                    }}
                    sx={{
                        borderRadius: '8px',
                        height: '29px',
                        bgcolor: '#fff',
                        '&.Mui-focused' : {
                            borderColor: '#000',
                        },
                    }}
                />
            </FormControl>
            <IconButton type="submit" sx={{color:'#000', marginLeft:'auto', marginRight:'0.5rem'}}>
                <CloudUploadIcon style={{fontSize: 24}} />
            </IconButton>
        </FormContainer>
    )
}

export const ProfileImageChange = ({ setFileState, handleSubmit, onStateChange}) => {

    const handleChange = (event) => {
        event.preventDefault();
        setFileState(event.target.files[0]);
    }

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 8px',
        lineHeight: 1.75,
        fontFamily: 'Quicksand',
        fontSize: '14px',
        fontWeight: 700,
        marginBottom: '0.8rem',
    }

    const inputStyle = {
        display: 'none',
    }

    return (
        <Box sx={{width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <label style={inputButtonStyle}>
                <input type="file" multiple onChange={handleChange} style={inputStyle}/>
                VELG
            </label>
            <Button 
                sx={{
                    padding: '6px 8px',
                    lineHeight: 1.75,
                    fontFamily: 'Quicksand',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: '#e0e000',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#000',
                    width: '100%',
                }}
                onClick={(event) => {
                    handleSubmit();
                    onStateChange(false);
                }}
            > LAST OPP</Button>
        </Box>
    )
}

export const ToggleAlertGroup = ({label, value, onChange}) => {

    return (
        <FormContainer>
            <FormText sx={{width:'70%'}}>{label}</FormText>
            <IOSSwitch checked={value} onChange={onChange} />
        </FormContainer>
    )

}