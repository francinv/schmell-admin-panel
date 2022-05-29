
export const getIdeaList = ({ gameList, devList, designList, variousList, wantedID }) => {
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

export const getColor = ({ categoryTitle }) => {
    let color = '';
    switch(categoryTitle) {
        case 'Spill':
            color = '#FCFC95';
            break;
        case 'Utvikling':
            color = '#95FCA5';
            break;
        case 'Design':
            color = '#959FFC';
            break;
        case 'Diverse':
            color = '#EB8145';
    }
    return color;
}

export const getList = ({ categoryTitle, gameList, devList, designList, variousList }) => {
    let temp = [];
    switch(categoryTitle) {
        case 'Spill':
            temp = temp.concat(gameList);
            break;
        case 'Utvikling':
            temp = temp.concat(devList);
            break;
        case 'Design':
            temp = temp.concat(designList);
            break;
        case 'Diverse':
            temp = temp.concat(variousList);
            break;
    }
    return temp;
}

export const getBorderRight = isLast => isLast ? '' : '1px #141400 dashed';