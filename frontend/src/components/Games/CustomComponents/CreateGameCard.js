import React from 'react';
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { H2 } from "../../styles/Typography";



export const CreateGameCard = ({handleOpen}) => {
    
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                bgcolor:'#F3F3F4',
                margin: '1rem',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <H2 sx={{color: '#9FA2B4'}}>Opprett nytt spill</H2>
                <IconButton 
                    sx={{color: '#9FA2B4'}} 
                    size='large'
                    onClick={handleOpen}
                >
                    <AddCircleOutlineOutlined style={{fontSize: 50}}/>
                </IconButton>
        </Box>
    )
}