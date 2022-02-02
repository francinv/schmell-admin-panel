import { Box } from "@mui/material";
import React from "react";
import { BODY_BOLD, H3 } from "../../styles/Typography";

const AdditionalInfoCard = (
    {borderBottom, title, content, borderBottomRight, borderTopRight}) => {

    return (
        <Box
            sx={{
                borderBottom: borderBottom,
                borderBottomRightRadius: borderBottomRight,
                borderTopRightRadius: borderTopRight,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
        >
            <BODY_BOLD sx={{color:'#9FA2B4'}}>{title}</BODY_BOLD>
            <H3>{content}</H3>
        </Box>
    )
}

export default AdditionalInfoCard;