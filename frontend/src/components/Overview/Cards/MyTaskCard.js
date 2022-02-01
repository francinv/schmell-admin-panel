import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { CARD_TEXT, H3 } from "../../styles/Typography";
import axiosService from "../../../utils/axios";
import { MyTaskContent } from "./CustomComponents/TableContent";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../../features/user/userSelectors";

const MyTaskCard = ({setActiveTab}) => {
    const [tasks, setTasks] = useState([]);
    const user = useSelector(selectActiveUser);

    useEffect(async () => {
        const url = `task?sort=PUBL_DESC&responsible=${user.id}&filter=ONLY_ACT`;
        const axe = axiosService.get(url)
        const response = await axe.then(res => res.data);
        setTasks(response.results);
    }, []);
    


    return(
        <Box
            sx={{
                marginLeft: '0.5rem',
                borderRadius: '8px',
                bgcolor: '#fff',
                border: '1px solid #DFE0EB',
                width: '50%',
                paddingTop: '1rem',
                paddingBottom: '1rem',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    width: '90%',
                    margin: '0 auto 0.8rem auto'
                }}
            >
                <Box>
                    <H3>Oppgaver</H3>
                    <CARD_TEXT sx={{color: '#9FA2B4'}}>Dagens</CARD_TEXT>
                </Box>
                <Button 
                    sx={{
                        color: '#e0e000',
                        marginLeft: 'auto',
                        alignSelf: 'center',
                        '&:hover': {
                            bgcolor: '#fcfce6'
                        }
                    }}
                    onClick={() => setActiveTab('T')}
                >Se alle</Button>
            </Box>
            {tasks.map((task) => (
                <MyTaskContent task={task} borderBottom={"1px solid #DFE0EB"} key={task.id}/>
            ))}
        </Box>
    )
}

export default MyTaskCard;