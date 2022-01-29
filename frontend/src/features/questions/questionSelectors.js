export const selectAllQuestions = (state) => state.question.allQuestions;
export const selectQuestionsByWeek = (state) => state.question.questionsByWeek;
export const selectQuestionStautsByWeek = (state) => state.question.statusByWeek;
export const selectQuestionStatusAll = (state) => state.question.statusAll;
export const selectQuestionsError = (state) => state.question.error;