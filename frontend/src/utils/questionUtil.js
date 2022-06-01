export const resetQuestions = values => {
    Object.keys(values).forEach(key => values[key] = '');
    return values;
};