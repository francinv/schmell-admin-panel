import { Box } from "@mui/material";
import React from "react";
import { BODY_BOLD } from "../components/styles/Typography";

export function getDate() {
    let today = new Date();
    var options = { month: 'short' , day: 'numeric', year: 'numeric' };
    return (today.toLocaleString("no-NO", options));
}

export function getPriority(priority) {
    let color;
    let text;

    if (priority === 3) {
        text = 'LAV';
        color = '#FEC400';
    } else if (priority === 2) {
        text = 'MEDIUM';
        color = '#29CC97';
    } else if (priority === 1) {
        text = 'HØY';
        color = '#F12B2C';
    }

    return (
        <Box
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                borderRadius: '100px',
                bgcolor: color,
                marginLeft: 'auto',
                padding: '0.2rem 0.5rem 0.2rem 0.5rem'
            }}
        >
            <BODY_BOLD sx={{color:'#fff'}}>{text}</BODY_BOLD>
        </Box>
    )
}