import { Box } from "@mui/material";
import React from "react";
import { isFirst, isLast } from "../../../utils/overviewUtil";
import { BODY_BOLD, H3 } from "../../styles/Typography";

const GeneralInfoCard = ({ title, content, positioning }) => {
    
    return (
        <Box
            sx={{
                borderBottom: isLast ? 'none' : '1px solid #DFE0EB',
                borderRadius: isFirst ? '0px 8px 0px 0px' : isLast ? '0px 0px 8px 0px' : 0,
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

export default GeneralInfoCard;