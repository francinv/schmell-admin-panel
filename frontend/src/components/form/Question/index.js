import React, { useState } from "react";
import { Box, FormControl, OutlinedInput } from "@mui/material";
import { BODY_BOLD } from "../../styles/Typography";

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