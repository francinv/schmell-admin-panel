export function sortGames(listToSort) {
    let tempList = listToSort.slice();
    var arr = tempList.sort((a,b) => {
        return a.id - b.id;
    })
    return arr;
}

export function sortWeeks(listToSort) {
    let tempList = listToSort.slice();
    var arr = tempList.sort((a,b) => {
        return a.week_number - b.week_number;
    })
    return arr;
}

