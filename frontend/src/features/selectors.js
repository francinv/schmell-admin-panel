export const selectActiveUser = (state) => state.user.activeUser;
export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectAllUsers = (state) => state.user.allUsers;
export const selectedGame = (state) => state.game.selectedGame;
export const selectGames = (state) => state.game.games;
export const selectGameStatus = (state) => state.game.status;
export const selectGameError = (state) => state.game.error;
export const selectAllQuestions = (state) => state.question.allQuestions;
export const selectQuestionsByWeek = (state) => state.question.questionsByWeek;
export const selectQuestionStautsByWeek = (state) => state.question.statusByWeek;
export const selectQuestionStatusAll = (state) => state.question.statusAll;
export const selectQuestionsError = (state) => state.question.error;
export const selectedWeek = (state) => state.week.selectedWeek;
export const selectWeeks = (state) => state.week.weeks;
export const selectWeeksStatus = (state) => state.week.status;
export const selectWeekError = (state) => state.week.error;
export const selectGameIdeas = (state) => state.idea.gameIdeas;
export const selectDevIdeas = (state) => state.idea.devIdeas;
export const selectDesignIdeas = (state) => state.idea.designIdeas;
export const selectVariousIdeas = (state) => state.idea.variousIdeas;
export const selectIdeaStatus = (state) => state.idea.status;
export const selectIdeaError = (state) => state.idea.error;

