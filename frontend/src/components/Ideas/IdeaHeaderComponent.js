import React, { useState } from "react";
import { Box } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateIdeaComp from "./CreateIdea";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BtnAdd from "../Buttons/BtnAdd";

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
                <BtnAdd
                    handleClick={handleClick}
                    borderRadius="8px 8px 0px 0px"
                    btnText="Jeg har en ny idé!"
                    endIcon={editStatus ? <CancelOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                />
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