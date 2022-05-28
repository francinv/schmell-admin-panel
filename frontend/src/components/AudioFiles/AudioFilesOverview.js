import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../features/hooks";
import AudioFilesHeaderComp from "./AudioFilesHeaderComp";
import { fetchAudioFiles } from "../../features/audiofiles/audioFileSlice";
import { selectAudioFilesP, selectAudioFilesPageSize, selectAudioFilesQuestion, selectAudioFilesQuestionId, selectAudioFileStatus } from "../../features/audiofiles/audiofileSelector";
import AudioFilesTable from "./AudioFilesTable";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";

const actionDispatch = (dispatch) => ({
    fetchFiles: (query) => dispatch(fetchAudioFiles(query)),
})

export const AudioFilesOverview = () => {
    const { fetchFiles } = actionDispatch(useAppDispatch());
    const question = useSelector(selectAudioFilesQuestion)
    const questionid = useSelector(selectAudioFilesQuestionId)
    const page_size = useSelector(selectAudioFilesPageSize);
    const p = useSelector(selectAudioFilesP);
    const statusOfRedux = useSelector(selectAudioFileStatus);


    useEffect(() => {
        if (statusOfRedux === 'idle') {
            const temp = {
                questionid: questionid,
                question: question,
                page_size: page_size,
                p: p,
            };
            fetchFiles(temp);
        }
    }, [questionid, question, page_size, p, statusOfRedux])
    
    return (
        <ContentWrapper pageTitle={"Lydfiler"}>
            <InnerWrapper>   
                <AudioFilesHeaderComp />
                <AudioFilesTable />
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default AudioFilesOverview;