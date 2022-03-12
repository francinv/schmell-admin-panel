import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { BODY_BOLD } from "../../styles/Typography";

const ProfileDetail = ({label, value, handleClick}) => {
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
            <Typography 
                sx={{
                    fontFamily: 'Quicksand',
                    fontSize: 16,
                    fontWeight: 500,
                    width: '25%',
                    marginRight: '0.8rem'
                }}
            >
                {label}
            </Typography>
            <BODY_BOLD 
                sx={{
                    width: '55%',
                    marginLeft: '1rem',
                    fontSize: 16
                }}
            >
                {value}
            </BODY_BOLD>
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

export default ProfileDetail;