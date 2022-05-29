import React from "react";
import { Box } from "@mui/material";
import ContentWrapper from "../components/layout/ContentWrapper";
import InnerWrapper from "../components/layout/InnerWrapper";
import SettingsHeader from "../components/Settings/SettingsHeader";
import UserInfoSection from "../components/Settings/UserInfoSection";
import AlertsSection from "../components/Settings/AlertsSection";

const Settings = () => {
    
    return (
        <ContentWrapper pageTitle="Innstillinger">
            <InnerWrapper>
                <SettingsHeader />
                <Box sx={{width: '90%'}}>
                    <UserInfoSection />
                    <AlertsSection />
                </Box>
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default Settings;
