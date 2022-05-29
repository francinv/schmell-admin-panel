import React from "react";
import { Box } from "@mui/material";
import ContentWrapper from "../components/layout/ContentWrapper";
import InnerWrapper from "../components/layout/InnerWrapper";
import SettingsHeader from "../components/Settings/SettingsHeaderComp";
import ProfileInfo from "../components/Settings/ProfileInfo";
import AlertComp from "../components/Settings/AlertComp";

const Settings = () => {
    
    return (
        <ContentWrapper pageTitle="Innstillinger">
            <InnerWrapper>
                <SettingsHeader />
                <Box sx={{width: '90%'}}>
                    <ProfileInfo />
                    <AlertComp />
                </Box>
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default Settings;
