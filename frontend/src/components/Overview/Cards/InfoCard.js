import { Box } from "@mui/material";
import React from "react";
import { H1, H3 } from "../../styles/Typography";

const InfoCard = ({title, content, marginLeft, marginRight}) => {

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
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                marginLeft: marginLeft,
                marginRight: marginRight,
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

export default InfoCard;