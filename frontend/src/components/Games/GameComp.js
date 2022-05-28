import React, { useState } from 'react';
import { GameOverview } from './GameOverview';
import { WeekOverview } from './WeekOverview';
import QuestionOverview from './QuestionOverview';

const GamesComp = () => {
    const [stage, setStage] = useState('G');
    
    switch(stage) {
        case 'G':
            return <GameOverview setStage={setStage} />;
        case 'W':
            return <WeekOverview setStage={setStage} />;
        case 'Q':
            return <QuestionOverview setStage={setStage} />;
        default:
            return <GameOverview setStage={setStage} />;
    }
}

export default GamesComp;