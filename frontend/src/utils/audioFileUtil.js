export const resetUploadFile = values => {
    values.related_question_id = '';
    values.gender_voice = 'M';
    return values;
}

export const getGender = value => value === 'M' ?  'Mann' : 'Kvinne';

export const parseQuestionsToOptions = questions => {
    return questions
        .map(question => {
            question.value = question.id
            question.text = `${question.value} ${question.question_desc}`
            delete question.id
            return question;
        });
}