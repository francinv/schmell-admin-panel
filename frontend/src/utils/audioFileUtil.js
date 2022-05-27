export function resetUploadFile(values) {
    values.related_question_id = '';
    values.gender_voice = 'M';
    return values;
}

export const getGender = value => value === 'M' ?  'Mann' : 'Kvinne';

