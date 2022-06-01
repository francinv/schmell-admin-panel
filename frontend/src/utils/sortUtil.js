export const sortGames = listToSort => listToSort
    .slice()
    .sort((a, b) => { return a.id - b.id;});

export const sortWeeks = listToSort => listToSort
    .slice()
    .sort((a,b) => { return a.week_number - b.week_number });

