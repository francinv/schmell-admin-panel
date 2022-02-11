import React, { useState } from "react";
import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";
import { CustomContainerForm, CustomToggleButtonGroup, CustomWidthText } from "..";

export const RadioTwoButtons = ({label, onChange}) => {

    const [alignment, setAlignment] = useState(true);

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
    const [alignment, setAlignment] = useState('D');

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