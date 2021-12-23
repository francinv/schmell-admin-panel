import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LogIn from './LogIn';
import SideBar from './SideBar';

const MainComp = () => {
    const isLoggedIn = true;

    const [activeTab, setActiveTab] = useState('T');

    if (isLoggedIn) {
        return (
            <Box sx={{display:'flex',}}>
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1}}
                >
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                </Box>
            </Box>
        );
    } else {
        return (
            <LogIn />
        )
    }
    
}

export default MainComp;