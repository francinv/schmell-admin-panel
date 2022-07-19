export const resetQuestions = values => {
    values.type = '';
    values.question_desc = '';
    values.phase = '';
    values.function = '';
    values.punishment = '';
    return values;
};