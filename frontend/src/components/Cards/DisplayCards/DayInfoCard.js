import React from "react";
import { Box } from "@mui/material";
import { H1, H3 } from "../../styles/Typography";
import { isFirst, isLast } from "../../../utils/overviewUtil";

const DayInfoCard = ({ title, content, positioning }) => {

    return (
        <Box
            sx={{
                width: '25%',
                minHeight: '135px',
                display:'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                backgroundColor: '#fff',
                border: '1px solid #DFE0EB',
                margin: isFirst(positioning) ? '0.5rem 0.5rem 0.5rem 0' : isLast(positioning) ? '0.5rem 0 0.5rem 0' : '0.5rem 0.5rem 0.5rem 0.5rem',
                '&:hover':{
                    color: '#e0e000'
                }
            }}
        >
            <H3>{title}</H3>
            <H1>{content}</H1>
        </Box>
    )
}

export default DayInfoCard;