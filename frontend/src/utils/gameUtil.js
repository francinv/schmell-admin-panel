import {useSelector} from 'react-redux';
import { selectCountByGame } from '../features/statistics/statisticSelectors';


export const getCount = idGame => {
    const count_by_game = useSelector(selectCountByGame);
    return count_by_game['N'+idGame];
}

export const resetCreateGame = values => {
    values.name = '';
    values.description = '';
    values.related_questions= true;
    values.status= 'D';
    values.release_date= '';
    return values;
}

export const parseRelatedValue = value => value ? 'Ja' : 'Nei';

export const isGreenOrRed = lastUpdated => {
    const actual = new Date(lastUpdated);
    const limit = new Date(Date.now() - 12096e5);
    let color = '#fff';
    if (actual < limit) {
        color = '#FF0000';
    } else {
        color = '#008000';
    }
    return color;
}