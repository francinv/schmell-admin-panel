import React, {useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import SideBar from '../SideBar';
import { HeaderContainer } from '../layout/content_header/header';
import { useSelector } from 'react-redux';
import { selectQuestionStatusAll } from '../../features/selectors';
import { fetchQuestions } from '../../features/questions/questionSlice';
import { useAppDispatch } from '../../features/hooks';

const actionDispatch = (dispatch) => ({
    fetchQuestions: () => dispatch(fetchQuestions()),
})

const OverviewComp = ({activeTab, setActiveTab}) => {
    const questionStatus = useSelector(selectQuestionStatusAll);
    const { fetchQuestions } = actionDispatch(useAppDispatch());

    useEffect(() => {
        if (questionStatus === 'idle') {
            fetchQuestions();
          }
    }, [questionStatus])

    return (
        <Box sx={{display:'flex', height: '100vh'}}>
            <Box 
                component="main"
                sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
            >
                    <SideBar activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <HeaderContainer page_title={"Oversikt"} sub_title={undefined}/>
            </Box>
        </Box>
    );
}

export default OverviewComp;