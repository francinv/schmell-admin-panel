import { Box } from "@mui/material";
import React from "react";
import SideBar from "../SideBar/SideBar";

const BodyWrapper = ({ children, activeTab, setActiveTab }) => {
    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            {children}
        </Box>
    );
};

export default BodyWrapper;