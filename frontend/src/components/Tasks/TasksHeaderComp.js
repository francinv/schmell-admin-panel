import React, { useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button } from "@mui/material";
import { H3 } from "../styles/Typography";
import SortMenu from "./menus/SortMenu";
import FilterMenu from "./menus/FilterMenu";
import CreateTaskForm from "./CreateTask";
import { resetStatus } from "../../features/tasks/taskSlice";
import { useAppDispatch } from "../../features/hooks";

const actionDispatch = (dispatch) => ({
    resetTasks: (query) => dispatch(resetStatus(query)),
})

const TaskHeaderComp = () => {
    const {resetTasks} = actionDispatch(useAppDispatch());

    const [open, setOpen] = useState(false);
    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
        resetTasks();
    }

    return (
        <Box
            sx={{
                width: '95%',
                display:'flex',
                flexDirection:'column',
                justifyContent: 'center',
            }}
        >
            <H3>Alle oppgaver</H3>
            <Box
                sx={{
                    width: '100%',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    display:'flex',
                }}
            >
                <Button
                    endIcon={<AddCircleOutlineOutlined />}
                    sx={{
                        bgcolor: '#e0e000',
                        color: '#141400',
                        fontFamily: 'Quicksand',
                        fontSize: '14px',
                        fontWeight: 700,
                        borderRadius: '8px',
                        '&:hover':{
                            bgcolor: '#141400',
                            color: '#e0e000',
                        },
                        '& .MuiButton-endIcon':{
                            fontSize:'50px',
                        },
                    }}
                    onClick={handleShow}
                >Opprett oppgave</Button>
                <SortMenu />
                <FilterMenu />
            </Box>

            <CreateTaskForm handleShow={handleShow} open={open}/>
        </Box>
    )
}

export default TaskHeaderComp;