
export const getColor = (categoryTitle) => {
    let color = '';
    switch(categoryTitle) {
        case 'Spill': {
            color = '#FCFC95';
            break;
        }
        case 'Utvikling': {
            color = '#95FCA5';
            break;
        }
        case 'Design': {
            color = '#959FFC';
            break;
        }
        case 'Diverse': {
            color = '#EB8145';
            break;
        }
        default: {
            color = '#000';
            break;
        }
    }
    return color;
}

export const getType = (categoryTitle) => {
    switch(categoryTitle) {
        case 'Spill': 
            return 'G';
        case 'Utvikling':
            return 'D';
        case 'Design':
            return 'W';
        case 'Diverse':
            return 'E';
        default:
            return 'E';
    }
}

export const getBorderRight = isLast => isLast ? '' : '1px #141400 dashed';