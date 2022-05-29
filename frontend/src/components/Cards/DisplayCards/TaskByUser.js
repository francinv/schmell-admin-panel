import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CARD_TEXT, H3 } from "../../styles/Typography";
import axiosService from "../../../utils/axios";
import { UserTaskContent } from "../../Overview/TableContent";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../../features/user/userSelectors";
import { myTaskUrl } from "../../../constants/urls";
import BtnSmall from "../../Buttons/BtnSmall";

const TaskByUser = ({ setActiveTab }) => {
    const [tasks, setTasks] = useState([]);

    const user = useSelector(selectActiveUser);

    useEffect(async () => {
        axiosService.get(myTaskUrl(user.id))
            .then(res => {
                setTasks(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    }, [user]);

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
                <BtnSmall btnText="Se mer" onClick={() => setActiveTab('T')}/>
            </Box>
            {tasks.map((task) => (
                <UserTaskContent task={task} borderBottom={"1px solid #DFE0EB"} key={task.id}/>
            ))}
        </Box>
    )
}

export default TaskByUser;