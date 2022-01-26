import { Box } from "@mui/material";
import React from "react";
import { BODY_BOLD } from "../components/styles/Typography";

export function getUpdatedTime(date) {
    let this_day = new Date();
    let updated_last = new Date(date);

    var difference = this_day.getTime() - updated_last.getTime();

    var diff_day = difference / (1000 * 3600 * 24);

    if (diff_day <= 1) {
        let temp = Math.round(difference / (1000 * 3600));
        return `Oppdatert ${temp} timer siden`
    } else if (diff_day < 1.5) {
        let temp = Math.round(diff_day);
        return `Oppdatert ${temp} dag siden`
    } else if (diff.day >= 1.5) {
        let temp = Math.round(diff_day);
        return `Oppdatert ${temp} dager siden`
    }
}

export function getDate(date) {
    let deadline = new Date(date);
    var options = { month: 'long' , day: 'numeric', year: 'numeric' };
    return (deadline.toLocaleString("no-NO", options));
}

export function getTime(date) {
    let deadline = new Date(date);
    var options = {hour: 'numeric', minute: '2-digit'}
    return (deadline.toLocaleTimeString("no-NO", options))
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
                bgcolor: color
            }}
        >
            <BODY_BOLD sx={{color:'#fff'}}>{text}</BODY_BOLD>
        </Box>
    )
}

export function getCategory(category) {
    let category_text;

    switch (category) {
        case 'G':
            category_text='Spill';
            break;
        case 'D':
            category_text='Utvikling';
            break;
        case 'W':
            category_text='Design';
            break;
        case 'M':
            category_text='Markedsføring';
            break;
        case 'E':
            category_text='Økonomi';
    }
    return category_text;
}

export function getFullDate(date) {
    let temp = new Date(date);
    var options = { month: 'long' , day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: "h24"};
    return (temp.toLocaleString("no-NO", options));
}