import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { fetchIdeas } from "../../features/ideas/ideaSlice";
import { useAppDispatch } from "../../features/hooks";
import { selectIdeaStatus } from "../../features/ideas/ideaSelectors";
import { selectActiveUser } from "../../features/user/userSelectors";
import SettingsHeader from "./SettingsHeaderComp";
import ProfileInfo from './ProfileInfo';
import AlertComp from "./AlertComp";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";

const actionDispatch = (dispatch) => ({
    fetchIdeas: (query) => dispatch(fetchIdeas(query)),
})

export const SettingsOverview = () => {
    const user = useSelector(selectActiveUser);
    
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
