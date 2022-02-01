import {useSelector} from 'react-redux';
import { selectCountByGame } from '../features/statistics/statisticSelectors';


export function getCount(idGame) {
    const count_by_game = useSelector(selectCountByGame);
    return count_by_game['N'+idGame];
}