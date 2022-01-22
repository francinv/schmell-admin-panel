import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { selectIdeaStatus } from "../../features/selectors";
import { fetchIdeas } from "../../features/ideas/ideaSlice";
import { useAppDispatch } from "../../features/hooks";
import IdeaHeaderComp from "./IdeaHeaderComponent";
import { IdeaColumnComp } from "./IdeaColumn";

const actionDispatch = (dispatch) => ({
    fetchIdeas: (query) => dispatch(fetchIdeas(query)),
})

export const IdeasOverview = () => {
    const ideaStatus = useSelector(selectIdeaStatus);
    const { fetchIdeas } = actionDispatch(useAppDispatch());

    useEffect(() => {
        if (ideaStatus === 'idle') {
            fetchIdeas('G');
            fetchIdeas('D');
            fetchIdeas('W');
            fetchIdeas('E');
        }
    }, [])
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Ideer"} sub_title={undefined}/>
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
                <IdeaHeaderComp />
                <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        margin: '1rem',
                    }}
                >
                    <IdeaColumnComp categoryTitle={"Spill"} last={false} />
                    <IdeaColumnComp categoryTitle={"Utvikling"} last={false} />
                    <IdeaColumnComp categoryTitle={"Design"} last={false} />
                    <IdeaColumnComp categoryTitle={"Diverse"} last={true} />
                </Box>
            </Box>
        </Box>
    )
}

export default IdeasOverview;