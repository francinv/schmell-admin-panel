import React from 'react';
import { Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../features/user/userSelectors';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BtnAdd from '../Buttons/BtnAdd';

const DisplayPicture = ({ setChangeStatus }) => {
    const user = useSelector(selectActiveUser);

    return (
        <Box sx={{width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar 
                alt={user.username}
                src={user.profile_picture}
                sx= {{
                    width: 80,
                    height: 80,
                }}  
            />
            <BtnAdd borderRadius='8px' btnText='Endre' endIcon={<PhotoLibraryIcon />} handleClick={() => setChangeStatus(true)} />
        </Box>
    )
}

export default DisplayPicture;