import React from "react"
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material"
import { CustomContainerForm, CustomWidthText } from ".."

export const SearchInput = ({
    placeholder,
    onChange,
    value
}) => {
    return (
        <FormControl 
            fullWidth 
            sx={{
                width: '65%',
                height: '35px',
            }}
        >
            <OutlinedInput
                value={value}
                onChange={onChange}
                placeholder={placeholder} 
                required
                type={'text'}
                style={{
                    fontFamily: 'Quicksand',
                    color: '#000',
                    fontSize: 18,
                }}
                sx={{
                    borderRadius: '8px',
                    height: '35px',
                    bgcolor: '#E5E5E5',
                    '&.Mui-focused' : {
                        borderColor: '#000',
                    },
                }}
            />
        </FormControl>
    )
}

export const SelectGender = ({value, onChange, options}) => {
    return (
        <CustomContainerForm>
            <CustomWidthText>Velg kjønn:</CustomWidthText>
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
                        bgcolor: '#E5E5E5',
                        height: '29px',
                        '&.Mui-focused' : {
                            borderColor: '#000',
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </CustomContainerForm>
    )
}

export const SelectQuestion = ({value, onChange, options}) => {
    console.log(options);
    if (options) {
        return (
            <CustomContainerForm>
                <CustomWidthText>Velg tilhørende spørsmål:</CustomWidthText>
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
                            bgcolor: '#E5E5E5',
                            height: '29px',
                            '&.Mui-focused' : {
                                borderColor: '#000',
                            },
                        }}
                    >
                        {options.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.id} {option.question_desc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CustomContainerForm>
        )
    } else {
        return null;
    }
}