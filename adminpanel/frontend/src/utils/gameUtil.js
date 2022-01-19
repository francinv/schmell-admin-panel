import {useSelector} from 'react-redux';
import { selectAllQuestions } from '../features/selectors';

export function getCount(idGame) {
    const questions = useSelector(selectAllQuestions);
    var count = 0;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].related_game === idGame) {
            count += 1;
        }
    }
    return count;
}