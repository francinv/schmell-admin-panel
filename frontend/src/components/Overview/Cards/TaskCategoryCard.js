import React from "react";
import { Box, Button } from "@mui/material";
import { CARD_TEXT, H3 } from "../../styles/Typography";
import { ContentCategory } from "./CustomComponents/TableContent";
import { useSelector } from "react-redux";
import { selectTaskDesign, selectTaskDevelopment, selectTaskEconomy, selectTaskGame, selectTaskMarketing } from "../../../features/statistics/statisticSelectors";

const TaskCategoryCard = ({setActiveTab}) => {
    const task_development = useSelector(selectTaskDevelopment);
    const task_game = useSelector(selectTaskGame);
    const task_design = useSelector(selectTaskDesign);
    const task_marketing = useSelector(selectTaskMarketing);
    const task_economy = useSelector(selectTaskEconomy);

    return (
        <Box
            sx={{
                marginRight: '0.5rem',
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
                    <H3>Oppgaver per kategori</H3>
                    <CARD_TEXT sx={{color: '#9FA2B4'}}>Gruppe: <b>Schmell</b></CARD_TEXT>
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
                >Se mer</Button>
            </Box>
            <ContentCategory title={"Utvikling"} content={task_development} borderBottom={"1px solid #DFE0EB"}/>
            <ContentCategory title={"Spill"} content={task_game} borderBottom={"1px solid #DFE0EB"}/>
            <ContentCategory title={"Design"} content={task_design} borderBottom={"1px solid #DFE0EB"}/>
            <ContentCategory title={"Markedsføring"} content={task_marketing} borderBottom={"1px solid #DFE0EB"}/>
            <ContentCategory title={"Økonomi"} content={task_economy} borderBottom={"0px"}/>
        </Box>
    )
}

export default TaskCategoryCard;