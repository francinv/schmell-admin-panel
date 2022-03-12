import React from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../../features/user/userSelectors';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const ProfilePicComp = ({setChangeStatus}) => {
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
            <Button
                endIcon={<PhotoLibraryIcon />}
                sx={{
                    bgcolor: '#e0e000',
                    color: '#141400',
                    fontFamily: 'Quicksand',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                    '&:hover':{
                        bgcolor: '#141400',
                        color: '#e0e000',
                    },
                    '& .MuiButton-endIcon':{
                        fontSize:'50px',
                    },
                }}
                onClick={() => setChangeStatus(true)}
            >Endre</Button>
        </Box>
    )
}

export default ProfilePicComp;