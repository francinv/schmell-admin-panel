import React from 'react';
import { Box, Typography } from '@mui/material';
import SideBar from '../SideBar';
import { HeaderContainer } from '../layout/content_header/header';


const StatisticsComp = ({activeTab, setActiveTab}) => {
    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <Box 
                component="main"
                sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
            >
                    <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <HeaderContainer page_title={"Statistikk"} sub_title={undefined}/>
            </Box>
        </Box>
    );
}

export default StatisticsComp;