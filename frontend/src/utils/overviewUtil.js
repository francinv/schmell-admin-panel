export const getPriorityColor = priority => {
    let color = '';

    switch (priority) {
        case 3: {
            color = '#FEC400'; 
            break;
        }
        case 2: {
            color = '#29CC97';
            break;
        }
        case 1: {
            color = '#F12B2C';
            break;
        }
        default: {
            break;
        }
    }
    return color;
}

export const getPriorityText = priority => {
    let text = '';

    switch (priority) {
        case 3: {
            text = 'LAV';
            break;
        }
        case 2: {
            text = 'MEDIUM';
            break;
        }
        case 1: {
            text = 'HØY';
            break;
        }
        default: {
            break;
        }
    }
    return text;
}

export const isFirst = position => position === 'first';

export const isLast = position => position === 'last';

export const getColorBasedOnValue = value => value > 0 ? '#008000' : '#FF0000';