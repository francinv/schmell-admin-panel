import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button } from "@mui/material";
import { H3 } from "../styles/Typography";
import SortMenu from "./menus/SortMenu";
import FilterMenu from "./menus/FilterMenu";

const TaskHeaderComp = () => {

    const [sort, setSort] = useState('PUBL_DESC');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [responsible, setResponsible] = useState('');

    useEffect(() => {
        console.log(sort);
        console.log(priority);
        console.log(status);
        console.log(responsible);
    }, [sort, priority, status, responsible]);
    
    const handleClick = () => {
        console.log("TODO");
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
                    onClick={handleClick}
                >Opprett oppgave</Button>
                <SortMenu setSort={setSort} sort={sort}/>
                <FilterMenu 
                    priority={priority} 
                    setPriority={setPriority} 
                    status={status}
                    setStatus={setStatus}
                    responsible={responsible}
                    setResponsible={setResponsible}
                />
            </Box>

        </Box>
    )
}

export default TaskHeaderComp;