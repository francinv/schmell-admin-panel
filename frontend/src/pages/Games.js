import React, { useState } from 'react';
import GameOverview from '../components/GamesSection/GameOverview';
import QuestionOverview from '../components/GamesSection/QuestionOverview';
import WeekOverview from '../components/GamesSection/WeekOverview';

const Games = () => {
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

export default Games;