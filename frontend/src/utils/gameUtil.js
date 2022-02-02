import {useSelector} from 'react-redux';
import { selectCountByGame } from '../features/statistics/statisticSelectors';


export function getCount(idGame) {
    const count_by_game = useSelector(selectCountByGame);
    return count_by_game['N'+idGame];
}

export function resetCreateGame(values) {
    values.name = '';
    values.description = '';
    values.related_questions= true;
    values.status= 'D';
    values.release_date= '';
    return values;
}