import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../features/hooks";
import TaskHeaderComp from "./TasksHeaderComp";


export const TasksOverview = () => {

    useEffect(() => {
    }, [])
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Oppgaver"} sub_title={undefined}/>
            <Box
                sx={{
                    width:'95%',
                    display:'flex',
                    bgcolor:'#fff',
                    flexWrap:'wrap',
                    marginTop:'50px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '8px',
                    justifyContent: 'center',
                    
                }}
            >   
                <TaskHeaderComp />
            </Box>
        </Box>
    )
}

export default TasksOverview;