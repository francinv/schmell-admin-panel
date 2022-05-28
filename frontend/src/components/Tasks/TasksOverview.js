import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { HeaderContainer } from "../layout/content_header/header";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../features/hooks";
import TaskHeaderComp from "./TasksHeaderComp";
import { selectP, selectPageSize, selectPriorityState, selectResponsibleState, selectSortState, selectStatusState, selectTasks, selectTaskStatus } from "../../features/tasks/taskSelectors";
import { fetchTasks } from "../../features/tasks/taskSlice";
import TaskTable from "./TaskTable";
import { fetchUsers } from "../../features/user/userSlice";
import ContentWrapper from "../layout/ContentWrapper";
import InnerWrapper from "../layout/InnerWrapper";

const actionDispatch = (dispatch) => ({
    fetchTasks: (query) => dispatch(fetchTasks(query)),
    fetchUsers: () => dispatch(fetchUsers())
})

export const TasksOverview = () => {
    const { fetchTasks } = actionDispatch(useAppDispatch());
    const { fetchUsers } = actionDispatch(useAppDispatch());
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
            fetchUsers();
        }
    }, [sort, status, priority, responsible, page_size, p, statusOfRedux])
    
    return (
        <ContentWrapper pageTitle="Oppgaver">
            <InnerWrapper>  
                <TaskHeaderComp />
                <TaskTable />
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default TasksOverview;