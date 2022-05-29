import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchIdeas } from "../../features/ideas/ideaSlice";
import { selectActiveUser } from "../../features/user/userSelectors";
import SettingsHeader from "./SettingsHeaderComp";
import ProfileInfo from './ProfileInfo';
import AlertComp from "./AlertComp";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";

export const SettingsOverview = () => {
    
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

export default SettingsOverview;
