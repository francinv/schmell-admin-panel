import React, { useState } from "react";
import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";
import { CustomToggleButtonGroup } from "../styles";

const Radio = props => {
    const { onChange, options, fontSize } = props;

    const [alignment, setAlignment] = useState(true);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        onChange(event);
    };

    const getWidth = () => (1 / options.length) * 100;

    const CustomRadio = styled(ToggleButton)(({_theme, option}) => ({
        width: `${getWidth()}%`,
        fontFamily: 'Quicksand',
        fontSize: fontSize,
        backgroundColor: option.color,
        color: option.textColor,
        opacity: 0.5,
        '&.Mui-selected': {
            backgroundColor: option.color,
            color: option.textColor,
            opacity: 1,
        },
        '&:hover': {
            backgroundColor: option.color,
            color: option.textColor,
            opacity: 0.75,
        },
        '&.Mui-selected:hover': {
            backgroundColor: option.color,
            color: option.textColor,
            opacity: 0.75,
        },
    }));

    return (
        <CustomToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
            {options.map((option) => (
                <CustomRadio key={option.value} value={option.value} option={option}>
                    {option.text}
                </CustomRadio>
            ))}
        </CustomToggleButtonGroup>
    );
};

export default Radio;