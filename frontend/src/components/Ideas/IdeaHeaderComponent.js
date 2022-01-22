import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateIdeaComp from "./CreateIdea";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const IdeaHeaderComp = () => {
    const [editStatus, setEditStatus] = useState(false);

    const handleClick = () => {
        setEditStatus((wasEditStatus) => !wasEditStatus);
    }

    return (    
        <Box
            sx={{
                width: '100%',
                margin: '1rem',
                display:'flex',
                alignItems:'center',
                justifyContent: 'flex-end',
            }}
        >              
            <Box
                sx={{
                    width: '25%',
                    bgcolor: '#e0e000',
                    display:'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                }}
            >
                <Button
                    endIcon={editStatus
                            ? <CancelOutlinedIcon />
                            : <AddCircleOutlineOutlinedIcon />
                    }
                    sx={{
                        bgcolor: '#e0e000',
                        color: '#141400',
                        fontFamily: 'Quicksand',
                        fontSize: '14px',
                        fontWeight: 700,
                        borderRadius: '8px 8px 0px 0px',
                        '&:hover':{
                            bgcolor: '#141400',
                            color: '#e0e000',
                            borderRadius:'8px 8px 0px 0px'
                        },
                        '& .MuiButton-endIcon':{
                            marginLeft:'auto',
                            fontSize:'50px',
                        },
                    }}
                    onClick={handleClick}
                >Jeg har en ny idé!</Button>
                {
                    editStatus
                    ? <CreateIdeaComp setStateChange={setEditStatus} />
                    : null
                }
            </Box>
        </Box>
    )   
}

export default IdeaHeaderComp;