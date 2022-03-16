import { Box } from '@mui/material';
import React from 'react';

const SmallContainer = ({children}) => {
    return (
        <Box
            sx={{
                width: '50%',
                margin: '2rem auto 2rem 2rem',
                padding: '0.5rem 1rem',
                bgcolor: '#E5E5E5',
                borderRadius: '8px',
                display:'flex',
            }}
        >
            {children}
        </Box>
    )
}

export default SmallContainer;