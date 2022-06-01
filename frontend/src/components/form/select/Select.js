import React from 'react';
import { Select, FormControl, MenuItem } from '@mui/material';

const SmallSelect = props => {
    const { value, onChange, options, height, fontSize } = props;
    return (
        <FormControl
            fullWidth
            sx={{
                width: '70%',
                height: height,
            }}
        >
            <Select
                value={value}
                onChange={onChange}
                style={{
                    fontFamily: 'Quicksand',
                    color: '#000',
                    fontSize: fontSize,
                }}
                sx={{
                    borderRadius: '8px',
                    bgcolor: '#E5E5E5',
                    height: height,
                    '&.Mui-focused' : {
                        borderColor: '#000',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SmallSelect;