import React, { useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box } from "@mui/material";
import { H3 } from "../styles/Typography";
import CreateTaskForm from "../Overlays/CreateOverlays/CreateTask";
import BtnAdd from "../Buttons/BtnAdd";
import Filter from "./menus/Filter";
import Sort from "./menus/Sort";
import { StyledOuterContainer } from "../styles/Containers";

const TasksHeader = () => {
    const [open, setOpen] = useState(false);
    
    const handleShow = () => {
        setOpen((wasOpen) => !wasOpen);
    }

    return (
        <StyledOuterContainer>
            <H3>Alle oppgaver</H3>
            <Box
                sx={{
                    width: '100%',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    display:'flex',
                }}
            >
                <BtnAdd
                    handleClick={handleShow}
                    btnText={"Legg til oppgave"}
                    endIcon={<AddCircleOutlineOutlined />}
                    borderRadius="8px"
                />
                <Sort />
                <Filter />
            </Box>
            <CreateTaskForm handleShow={handleShow} open={open}/>
        </StyledOuterContainer>
    )
}

export default TasksHeader;