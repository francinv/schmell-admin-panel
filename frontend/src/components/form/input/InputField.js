import React from "react";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const InputField = props => {
    const { value, onChange, placeholder, type, height, fontSize, marginLeft, backgroundColor, width } = props;

    const isDateTime = type === 'datetime-local';

    return (
        <FormControl 
            fullWidth 
            sx={{
                width: width,
                height: height,
                marginLeft: marginLeft,
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
                    fontSize: fontSize,
                }}
                sx={{
                    borderRadius: '8px',
                    height: height,
                    backgroundColor: backgroundColor,
                    '&.Mui-focused' : {
                        borderColor: '#000',
                    },
                }}
                endAdornment={isDateTime ? <InputAdornment position='end'><AccessTimeIcon /></InputAdornment> : null}
            />
        </FormControl>
    );
};

export default InputField;