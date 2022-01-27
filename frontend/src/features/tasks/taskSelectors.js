export const selectTaskCount = (state) => state.task.count;
export const selectTaskPrevious = (state) => state.task.previous;
export const selectTaskNext = (state) => state.task.next;
export const selectTasks = (state) => state.task.tasks;
export const selectTaskStatus = (state) => state.task.status;
export const selectTaskError = (state) => state.task.error;
export const selectSortState = (state) => state.task.sortState;
export const selectStatusState = (state) => state.task.statusState;
export const selectPriorityState = (state) => state.task.priorityState;
export const selectResponsibleState = (state) => state.task.responsibleState;
export const selectPageSize = (state) => state.task.page_size;
export const selectP = (state) => state.task.p;
export const selectSelectedTask = (state) => state.task.selectedTask;