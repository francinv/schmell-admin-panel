import React, { useState } from 'react';
import { EditQuestionCard } from './CustomComponents/ChangeQuestion';
import { DisplayQuestionComp } from './CustomComponents/DisplayQuestion';

const QuestionCard = ({question}) => {
    const [stateChangeQuestion, setStateChangeQuestion] = useState(false);
    
    return (
        <>
            {
                stateChangeQuestion
                ? <EditQuestionCard question={question} setStateChangeQuestion={setStateChangeQuestion}/>
                : <DisplayQuestionComp question={question} setStateChangeQuestion={setStateChangeQuestion}/>
            }
        </>
    );
}

export default QuestionCard;