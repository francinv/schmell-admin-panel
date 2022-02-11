export function resetQuestions(values) {
    values.type = '';
    values.question_desc = '';
    values.hint = '';
    values.related_question = '';
    values.phase = '';
    values.function = '';
    values.punishment = '';
    return values;
}