import React from "react";
import { Box } from "@mui/material";
import MyTaskCard from "./Cards/MyTaskCard";
import TaskCategoryCard from "./Cards/TaskCategoryCard";

const TaskOverviewSection = ({setActiveTab}) => {
    return (
        <Box
            sx={{
                display:'flex',
                width: '95%',
                margin: '0.5rem auto 0.5rem auto'
            }}
        >
            <TaskCategoryCard setActiveTab={setActiveTab} />
            <MyTaskCard setActiveTab={setActiveTab} />
        </Box>
        
    )
}

export default TaskOverviewSection;