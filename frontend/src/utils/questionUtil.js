export const resetQuestions = values => {
    Object.keys(values).forEach(key => {
        if (!(key === 'related_game' || key === 'related_week')) {
            values[key] = '';
        }
    });
    return values;
};