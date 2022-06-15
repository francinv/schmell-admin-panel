import React from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { BODY_BOLD, BODY_MEDIUM } from "../styles/Typography";

const DisplayDetail = ({ label, value, handleClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '85%',
                marginTop: '1rem',
                marginBottom:'1rem',
                alignItems: 'center',
            }}
        >
            <BODY_MEDIUM sx={{ width: '25%',  marginRight: '0.8rem'}}>{label}</BODY_MEDIUM>
            <BODY_BOLD sx={{ width: '55%', marginLeft: '1rem', fontSize: 16}}>{value}</BODY_BOLD>
            <IconButton 
                sx={{
                    color:'#000', 
                    marginLeft:'auto', 
                    marginRight:'0.5rem'
                }}
                onClick={handleClick}
            >
                <EditIcon style={{fontSize: 24}} />
            </IconButton>
        </Box>
    );
}

export default DisplayDetail;