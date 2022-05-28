import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../../features/user/userSelectors";
import { H1 } from "../../styles/Typography";
import { ProfileAvatar } from "./profile";


export const HeaderContainer = ({pageTitle, subTitle, button}) => {
    const user = useSelector(selectActiveUser);

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '95%',
                marginTop: '30px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom:'50px',
            }}            
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box 
                    sx={{
                        display:'flex',
                        flexDirection: 'row'
                    }}
                >   
                    {
                        button === undefined
                        ? null
                        : button
                    }
                    <H1>{pageTitle}</H1>
                </Box>
                
                {
                    subTitle === undefined
                    ? null
                    : subTitle
                }
            </Box>
            
            <ProfileAvatar user={user} />
        </Box>
    )
}