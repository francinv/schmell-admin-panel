import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { InputAdornment, MenuItem, OutlinedInput, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BODY_BOLD } from '../styles/Typography';

export const CustomWidthText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Quicksand',
    fontSize: 16,
    fontWeight: 500,
    width: '30%',
    marginRight: '0.8rem',
}));

export const CustomContainerForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
    marginBottom:'1rem',
    alignItems: 'center',
}));

export const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    width: '70%',
    height: '29px',
    bgcolor: '#E5E5E5',

}))

export const InputTextField = ({label, placeholder, value, onChange, type}) => {

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
                <OutlinedInput
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} 
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
                        bgcolor: '#E5E5E5',
                        '&.Mui-focused' : {
                            borderColor: '#000',
                        },
                    }}
                />
            </FormControl>
        </CustomContainerForm>
    )
}

export const InputTextArea = ({label, placeholder, value, onChange}) => {

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <FormControl 
                fullWidth 
                sx={{
                    width: '70%',
                }}
            >
                <OutlinedInput
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} 
                    multiline
                    rows={3}
                    required
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#000',
                        fontSize: 14,
                    }}
                    sx={{
                        borderRadius: '8px',
                        bgcolor: '#E5E5E5',
                        '&.Mui-focused' : {
                            borderColor: '#000',
                        },
                    }}
                />
            </FormControl>
        </CustomContainerForm>
    )
}

export const ImageUpload = ({label, placeholder, fileState, setFileState}) => {

    
    const handleFileChange = (event) => {
        event.preventDefault();
        setFileState(event.target.files[0]);
    }

    const inputStyle = {
        display: 'none',
    }

    const inputContainerStyle = {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        height: '29px',
        fontFamily: 'Quicksand',
    }

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px 0px 0px 8px',
        borderRight: '1px solid #000',
        width: '50%',
        texxtAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#fff',
        },
        
    }

    const preview_color = {
        borderRadius: '0px 8px 8px 0px',
        backgroundColor: '#E5E5E5',
        width: '50%',
        paddingLeft: '0.2rem',
        display:'flex',
        alignItems: 'center',
    }

    return (
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <div style={inputContainerStyle}>
                <label style={inputButtonStyle}>
                    <input type="file" multiple onChange={handleFileChange} style={inputStyle}/>
                    {placeholder}
                </label>
                <label style={preview_color}><b>Fil: </b> {fileState.name}</label>
            </div>

        </CustomContainerForm>
    );
}

export const CustomDateTimePicker = ({label, onChange, value}) => {

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
                <OutlinedInput
                    value={value}
                    onChange={onChange}
                    required
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
        </CustomContainerForm>
    )
}