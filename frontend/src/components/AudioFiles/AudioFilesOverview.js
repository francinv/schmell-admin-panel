import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../features/hooks";
import AudioFilesHeaderComp from "./AudioFilesHeaderComp";
import { fetchAudioFiles } from "../../features/audiofiles/audioFileSlice";
import { selectAudioFilesP, selectAudioFilesPageSize, selectAudioFilesQuestion, selectAudioFilesQuestionId, selectAudioFileStatus } from "../../features/audiofiles/audiofileSelector";
import AudioFilesTable from "./AudioFilesTable";

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
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Lydfiler"} sub_title={undefined}/>
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
                <AudioFilesHeaderComp />
                <AudioFilesTable />
            </Box>
        </Box>
    )
}

export default AudioFilesOverview;