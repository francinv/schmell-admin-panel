import React from "react";
import { FormControl, OutlinedInput } from "@mui/material";

const TextArea = props => {
    const { value, onChange, placeholder, width, marginLeft, fontSize, backgroundColor} = props;

    return (
        <FormControl fullWidth sx={{ width: width, marginLeft: marginLeft }}>
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
                    fontSize: fontSize,
                    padding: '0.5rem',
                }}
                sx={{
                    borderRadius: '8px',
                    backgroundColor: backgroundColor,
                    '&.Mui-focused': {
                        borderColor: '#000',
                    },
                    padding: '0.5rem',
                }}
            />
        </FormControl>
    );
};

export default TextArea;