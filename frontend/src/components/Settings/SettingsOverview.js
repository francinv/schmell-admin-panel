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

const actionDispatch = (dispatch) => ({
    fetchIdeas: (query) => dispatch(fetchIdeas(query)),
})

export const SettingsOverview = () => {
    const user = useSelector(selectActiveUser);
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Innstillinger"} sub_title={undefined}/>
            <Box
                sx={{
                    width:'95%',
                    display:'flex',
                    bgcolor:'#fff',
                    flexWrap:'wrap',
                    marginTop:'50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    
                }}
            >
                <SettingsHeader />
                <Box sx={{width: '90%'}}>
                    <ProfileInfo />
                    <AlertComp />
                </Box>
            </Box>
        </Box>
    )
}

export default SettingsOverview;
