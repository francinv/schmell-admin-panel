import React from "react";
import { Box } from "@mui/material";
import TaskByCategory from "../Cards/DisplayCards/TaskByCategory";
import TaskByUser from "../Cards/DisplayCards/TaskByUser";

const TaskOverviewSection = ({ setActiveTab }) => {
    return (
        <Box
            sx={{
                display:'flex',
                width: '95%',
                margin: '0.5rem auto 0.5rem auto'
            }}
        >
            <TaskByCategory setActiveTab={setActiveTab} />
            <TaskByUser setActiveTab={setActiveTab} />
        </Box>
        
    )
}

export default TaskOverviewSection;