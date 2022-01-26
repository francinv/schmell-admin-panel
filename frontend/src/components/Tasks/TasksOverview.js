import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../features/hooks";
import TaskHeaderComp from "./TasksHeaderComp";
import { selectP, selectPageSize, selectPriorityState, selectResponsibleState, selectSortState, selectStatusState, selectTasks, selectTaskStatus } from "../../features/tasks/taskSelectors";
import { fetchTasks } from "../../features/tasks/taskSlice";
import TaskTable from "./TaskTable";

const actionDispatch = (dispatch) => ({
    fetchTasks: (query) => dispatch(fetchTasks(query))
})

export const TasksOverview = () => {
    const { fetchTasks } = actionDispatch(useAppDispatch());
    const sort = useSelector(selectSortState);
    const status = useSelector(selectStatusState);
    const priority = useSelector(selectPriorityState);
    const responsible = useSelector(selectResponsibleState);
    const page_size = useSelector(selectPageSize);
    const p = useSelector(selectP);
    const statusOfRedux = useSelector(selectTaskStatus);


    useEffect(() => {
        if (statusOfRedux === 'idle') {
            const temp = {
                sort: sort,
                status: status,
                priority: priority,
                responsible: responsible,
                page_size: page_size,
                p: p,
            };
            fetchTasks(temp);
        }
    }, [sort, status, priority, responsible, page_size, p, statusOfRedux])
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor:'#F7F8FC', height:'100%'}}
        >
            <HeaderContainer page_title={"Oppgaver"} sub_title={undefined}/>
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
                <TaskHeaderComp />
                <TaskTable />
            </Box>
        </Box>
    )
}

export default TasksOverview;