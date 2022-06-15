import React from "react";
import { Box } from "@mui/material";

const CardContainer = ({ children, width, flexDirection, setButtonStyle }) => {
    return ( 
        <Box
            sx={{
                display: 'flex',
                flexDirection: flexDirection,
                width: width,
                bgcolor: '#F3F3F4',
                margin: '1rem',
                borderRadius: '8px',
                transition: 'background-color 400ms linear',
                '&:hover': {
                    bgcolor: '#9FA2B4',
                },
                '&:hover .CARD_Title': {
                    color: '#e0e000',
                }
            }}
            onMouseEnter={e => {
                setButtonStyle({ display: 'block' });
            }}
            onMouseLeave={e => {
                setButtonStyle({ display: 'none' });
            }}
        >
            {children}
        </Box>
    );
};

export default CardContainer;