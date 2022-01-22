
export function getIdeaList(gameList, devList, designList, variousList, wantedID) {
    let temp;

    const tempIdea1 = designList.find(i => i.id === wantedID);
    const tempIdea2 = devList.find(i => i.id === wantedID);
    const tempIdea3 = gameList.find(i => i.id === wantedID);
    const tempIdea4 = variousList.find(i => i.id === wantedID);
    if (tempIdea1) {
        temp = 'W';
    }
    else if (tempIdea2) {
        temp = 'D';
    }
    else if (tempIdea3) {
        temp = 'G';
    }
    else if (tempIdea4) {
        temp = 'E'
    }
    
    return temp;
}