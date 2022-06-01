import React from "react";
import { Box } from "@mui/material";
import { BODY_BOLD } from "../components/styles/Typography";

export const getUpdatedTime = date => {
    const dateNow = new Date();
    const dateLastUpdated = new Date(date);

    const difference = dateNow.getTime() - dateLastUpdated.getTime();

    const diff_day = difference / (1000 * 3600 * 24);

    if (diff_day <= 1) {
        const hoursSinceUpdate = Math.round(difference / (1000 * 3600));
        return `Oppdatert ${hoursSinceUpdate} timer siden`
    } else if (diff_day < 1.5) {
        const daySinceUpdate = Math.round(diff_day);
        return `Oppdatert ${daySinceUpdate} dag siden`
    } else if (diff_day >= 1.5) {
        const daysSinceUpdate = Math.round(diff_day);
        return `Oppdatert ${daysSinceUpdate} dager siden`
    }
}

export const getPriority = priority => {
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

export const getCategory = category => {
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

export const resetFields = values => Object.keys(values).forEach(key => values[key] = '');

export const parseGamesToOptions = games => {
    const parsedGames = games
        .map(game => ({
            ...game,
            value: game.id,
            text: game.name
        }));
    return parsedGames;
};