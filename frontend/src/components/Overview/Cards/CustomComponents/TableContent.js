import { Box, Checkbox } from "@mui/material";
import React from "react";
import { getPriority } from "../../../../utils/overviewUtil";
import { BODY_BOLD } from "../../../styles/Typography";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const ContentCategory = ({title, content, borderBottom}) => {

    return (
        <Box
            sx={{
                display:'flex',
                width: '90%',
                margin: '0 auto 0 auto',
                padding: '1rem 0 1rem 0',
                borderBottom: borderBottom
            }}
        >
            <BODY_BOLD>{title}</BODY_BOLD>
            <BODY_BOLD sx={{color: '#9fa2b4', marginLeft: 'auto'}}>{content}</BODY_BOLD>
        </Box>
    )
}

export const MyTaskContent = ({task, borderBottom}) => {

    return (
        <Box
            sx={{
                display:'flex',
                width: '90%',
                margin: '0 auto 0 auto',
                padding: '1rem 0 1rem 0',
                borderBottom: borderBottom,
                alignItems: 'center'
            }}
        >
            <BODY_BOLD>{task.title}</BODY_BOLD>
            {getPriority(task.priority)}
        </Box>
    )
}