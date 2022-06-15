import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AudioFilesHeader from "../components/AudioFiles/AudioFilesHeader";
import AudioFilesTable from "../components/AudioFiles/AudioFilesTable";
import ContentWrapper from "../components/layout/ContentWrapper";
import InnerWrapper from "../components/layout/InnerWrapper";
import { selectAudioFilesP, selectAudioFilesPageSize, selectAudioFilesQuestion, selectAudioFilesQuestionId, selectAudioFileStatus } from "../features/audiofiles/audiofileSelector";
import { fetchAudioFiles } from "../features/audiofiles/audioFileSlice";
import { useAppDispatch } from "../features/hooks";

const actionDispatch = (dispatch) => ({
    fetchFiles: (query) => dispatch(fetchAudioFiles(query)),
})

const AudioFiles = () => {
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
                <AudioFilesHeader />
                <AudioFilesTable />
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default AudioFiles;