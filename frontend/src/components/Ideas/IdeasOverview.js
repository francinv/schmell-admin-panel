import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchIdeas } from "../../features/ideas/ideaSlice";
import { useAppDispatch } from "../../features/hooks";
import IdeaHeaderComp from "./IdeaHeaderComponent";
import { IdeaColumnComp } from "./IdeaColumn";
import { selectIdeaStatus } from "../../features/ideas/ideaSelectors";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";

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
        <ContentWrapper pageTitle="Ideer">
            <InnerWrapper>   
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
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default IdeasOverview;