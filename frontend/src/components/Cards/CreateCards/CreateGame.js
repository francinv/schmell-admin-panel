import React from 'react';
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { IconButton } from "@mui/material";
import { H2 } from "../../styles/Typography";
import CreateContainer from '../CreateContainer';

const CreateGame = ({handleOpen}) => {
    return(
        <CreateContainer width="30%">
            <H2 sx={{color: '#9FA2B4'}}>Opprett nytt spill</H2>
                <IconButton 
                    sx={{color: '#9FA2B4'}} 
                    size='large'
                    onClick={handleOpen}
                >
                    <AddCircleOutlineOutlined style={{fontSize: 50}}/>
                </IconButton>
        </CreateContainer>
    );
};

export default CreateGame;