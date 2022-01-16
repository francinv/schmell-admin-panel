import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { InputAdornment, OutlinedInput, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BODY_BOLD } from '../styles/Typography';

const CustomWidthText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Quicksand',
    fontSize: 16,
    fontWeight: 500,
    width: '30%',
}));

const CustomContainerForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
    marginBottom:'1rem',
    alignItems: 'center',
}));

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
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

export const RadioTwoButtons = ({label, onChange}) => {

    const [alignment, setAlignment] = React.useState(true);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        onChange(event);
    };

    const CustomButtonRadioTwo = styled(ToggleButton)(({theme}) => ({
        width: '50%',
        fontFamily: 'Quicksand',
        fontSize: '14px',
        backgroundColor: '#e5e5e5',
        color: 'black',
        '&.Mui-selected': {
            backgroundColor: '#000',
            color: '#e0e000',
        },
        '&:hover': {
            backgroundColor: '#1a1a1a',
            color: '#fff',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#1a1a1a',
        }
    }))

    return (
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <CustomToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
            >           
                <CustomButtonRadioTwo value={true} sx={{borderRight: '1px solid #9FA2B4'}}>Ja</CustomButtonRadioTwo>
                <CustomButtonRadioTwo value={false}>Nei</CustomButtonRadioTwo>
            </CustomToggleButtonGroup>
        </CustomContainerForm>
    );
}

export const RadioThreeButtons = ({label, onChange}) => {
    const [alignment, setAlignment] = React.useState('D');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        onChange(event);
    };

    const CustomButtonRadioThree = styled(ToggleButton)(({theme}) => ({
        width: '33.333%',
        fontFamily: 'Quicksand',
        fontSize: '14px',
        backgroundColor: '#e5e5e5',
        color: 'black',
        '&.Mui-selected': {
            backgroundColor: '#000',
            color: '#e0e000',
        },
        '&:hover': {
            backgroundColor: '#1a1a1a',
            color: '#fff',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#1a1a1a',
        }
    }))

    return (
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <CustomToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
            >           
                <CustomButtonRadioThree value='D' sx={{borderRight: '1px solid #9FA2B4'}}>Utvikling</CustomButtonRadioThree>
                <CustomButtonRadioThree value='R' sx={{borderRight: '1px solid #9FA2B4'}}>Ready</CustomButtonRadioThree>
                <CustomButtonRadioThree value='P'>Deployed</CustomButtonRadioThree>
            </CustomToggleButtonGroup>
        </CustomContainerForm>
    );
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

export const InputTextAreaDescription = ({label, value, onChange}) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <BODY_BOLD>{label}</BODY_BOLD>
            <FormControl 
                fullWidth 
                sx={{
                    width: '100%',
                }}
            >
                <OutlinedInput
                    value={value}
                    onChange={onChange}
                    multiline
                    rows={3}
                    required
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#000',
                        fontSize: 14,
                        padding: '0.5rem',
                    }}
                    sx={{
                        borderRadius: '8px',
                        bgcolor: '#E5E5E5',
                        '&.Mui-focused' : {
                            borderColor: '#000',
                        },
                        padding: '0.5rem',
                    }}
                />
            </FormControl>
        </Box>
    )
}


export const ImageUploadChange = ({label, placeholder, fileState, handleFileChange}) => {

    const [fileSet, setFileSet] = useState(false);

    const inputStyle = {
        display: 'none',
    }

    const inputContainerStyle = {
        width: '100%',
        display: 'flex',
        height: '29px',
        fontFamily: 'Quicksand',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
    }

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px',
        texxtAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem', 
    }

    const handleChange = (event) => {
        handleFileChange(event);
        setFileSet(true);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <BODY_BOLD>
                {
                    fileSet
                    ?  fileState.name
                    :  label
                }
            </BODY_BOLD>
            <div style={inputContainerStyle}>
                <label style={inputButtonStyle}>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleChange} 
                        style={inputStyle}
                    />
                    {placeholder}
                </label>
            </div>
        </Box>
    );
}

export const TextInputQuestion = ({label, value, handleChange, type}) => {
    return (
        <Box
            sx={{
                display:'flex',
                flexDirection: 'row',
                width: '100%',
                marginTop:'0.3rem',
                marginBottom: '0.3rem',
            }}
        >
            <BODY_BOLD sx={{width:'20%'}}>{label}</BODY_BOLD>
            <FormControl 
                fullWidth 
                sx={{
                    width: '80%',
                    height: '20px',
                    marginLeft:'0.8rem',
                }}
            >
                <OutlinedInput
                    value={value}
                    onChange={handleChange}
                    type={type}
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#141400',
                        fontSize: 12,
                    }}
                    sx={{
                        borderRadius: '8px',
                        height: '20px',
                        bgcolor: '#9FA2B4',
                    }}
                />
            </FormControl>

        </Box>
    )
}

export const QuestionTextArea = ({label, value, handleChange}) => {
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                marginTop:'0.3rem',
                marginBottom: '0.3rem',
            }}
        >
            <BODY_BOLD sx={{width:'20%'}}>{label}</BODY_BOLD>
            <FormControl 
                fullWidth 
                sx={{
                    width: '80%',
                    marginLeft:'0.8rem',
                }}
            >
                <OutlinedInput
                    value={value}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#141400',
                        fontSize: 12,
                        padding: '0.5rem',
                    }}
                    sx={{
                        borderRadius: '8px',
                        bgcolor: '#9FA2B4',
                        padding: '0.5rem',
                    }}
                />
            </FormControl>
        </Box>
    )
}