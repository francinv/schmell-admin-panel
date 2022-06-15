import React from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "./content_header/header";

const ContentWrapper = ({ children, pageTitle, subTitle, button }) => {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer pageTitle={pageTitle} subTitle={subTitle} button={button} />
            {children}
        </Box>
    );
};

export default ContentWrapper;