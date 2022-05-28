import React, { useState } from 'react';
import EditQuestion from '../CreateCards/EditQuestion';
import DisplayQuestion from './DisplayQuestion';

const QuestionCard = ({question}) => {
    const [stateChangeQuestion, setStateChangeQuestion] = useState(false);
    
    return (
        <>
            {
                stateChangeQuestion
                ? <EditQuestion question={question} setStateChangeQuestion={setStateChangeQuestion}/>
                : <DisplayQuestion question={question} setStateChangeQuestion={setStateChangeQuestion}/>
            }
        </>
    );
}

export default QuestionCard;