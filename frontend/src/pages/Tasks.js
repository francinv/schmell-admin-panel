import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../components/layout/ContentWrapper";
import InnerWrapper from "../components/layout/InnerWrapper";
import TasksHeader from "../components/Tasks/TasksHeader";
import TaskTable from "../components/Tasks/TaskTable";
import { useAppDispatch } from "../features/hooks";
import { selectP, selectPageSize, selectPriorityState, selectResponsibleState, selectSortState, selectStatusState, selectTaskStatus } from "../features/tasks/taskSelectors";
import { fetchTasks } from "../features/tasks/taskSlice";
import { fetchUsers } from "../features/user/userSlice";

const actionDispatch = (dispatch) => ({
    fetchTasks: (query) => dispatch(fetchTasks(query)),
    fetchUsers: () => dispatch(fetchUsers())
})

const Tasks = () => {
    const { fetchTasks, fetchUsers } = actionDispatch(useAppDispatch());

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
                <TasksHeader />
                <TaskTable />
            </InnerWrapper>
        </ContentWrapper>
    )
}

export default Tasks;