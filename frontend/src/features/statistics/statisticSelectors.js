export const selectGameCount = (state) => state.statistic.game_count;
export const selectUserCount = (state) => state.statistic.users_count;
export const selectQuestionsCount = (state) => state.statistic.questions_count;
export const selectTaskUnsolved = (state) => state.statistic.task_unsolved;
export const selectTaskOverdue = (state) => state.statistic.task_overdue;
export const selectTaskDevelopment = (state) => state.statistic.task_development;
export const selectTaskGame = (state) => state.statistic.task_game;
export const selectTaskDesign = (state) => state.statistic.task_design;
export const selectTaskMarketing = (state) => state.statistic.task_marketing;
export const selectTaskEconomy = (state) => state.statistic.task_economy;
export const selectCountByGame = (state) => state.statistic.count_by_game;
export const selectStatisticStatus = (state) => state.statistic.status;
export const selectStatisticError = (state) => state.statistic.error;
export const selectSolved = (state) => state.statistic.solved_by_me;