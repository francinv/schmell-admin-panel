import React from "react";
import { Box } from "@mui/material";
import { getPriorityColor, getPriorityText } from "../../utils/overviewUtil";
import { BODY_BOLD } from "../styles/Typography";

export const CategoryContent = ({title, content, borderBottom}) => {

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

export const UserTaskContent = ({ task, borderBottom }) => {

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
            <Box
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius: '100px',
                    backgroundColor: getPriorityColor(task.priority),
                    marginLeft: 'auto',
                    padding: '0.2rem 0.5rem 0.2rem 0.5rem'
                }}
            >
                <BODY_BOLD sx={{color:'#fff'}}>{getPriorityText(task.priority)}</BODY_BOLD>
            </Box>
        </Box>
    )
}