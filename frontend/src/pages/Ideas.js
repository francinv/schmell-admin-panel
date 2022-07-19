import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchIdeas } from "../features/ideas/ideaSlice";
import { selectIdeaStatus } from "../features/ideas/ideaSelectors";
import { useAppDispatch } from "../features/hooks";
import ContentWrapper from "../components/layout/ContentWrapper";
import InnerWrapper from "../components/layout/InnerWrapper";
import IdeasHeader from "../components/IdeasSection/IdeaHeader";
import IdeaColumn from "../components/IdeasSection/IdeaColumn";

const actionDispatch = (dispatch) => ({
    getIdeas: (query) => dispatch(fetchIdeas(query)),
})

const Ideas = () => {
    const ideaStatus = useSelector(selectIdeaStatus);
    const { getIdeas } = actionDispatch(useAppDispatch());

    useEffect(() => {
        if (ideaStatus === 'idle') {
            getIdeas('G');
            getIdeas('D');
            getIdeas('W');
            getIdeas('E');
        }
    }, [])
    
    return (
        <ContentWrapper pageTitle="Ideer">
            <InnerWrapper>   
                <IdeasHeader />
                <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        margin: '1rem',
                    }}
                >
                    <IdeaColumn categoryTitle={"Spill"} last={false} />
                    <IdeaColumn categoryTitle={"Utvikling"} last={false} />
                    <IdeaColumn categoryTitle={"Design"} last={false} />
                    <IdeaColumn categoryTitle={"Diverse"} last={true} />
                </Box>
            </InnerWrapper>
        </ContentWrapper>
    );
};

export default Ideas;