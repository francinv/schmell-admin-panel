import { Box } from "@mui/material";
import React from "react";

const InnerWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                width:'95%',
                display:'flex',
                bgcolor:'#fff',
                flexWrap:'wrap',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '8px',
                justifyContent: 'center',
            }}
        >{children}</Box>
    );
};

export default InnerWrapper;