import React from 'react';
import OverviewComp from '../components/Overview/OverviewComp';
import StatisticsComp from '../components/Statistics';
import BodyWrapper from '../components/layout/BodyWrapper';
import AudioFilesOverview from '../components/AudioFiles/AudioFilesOverview';
import TasksOverview from '../components/Tasks/TasksOverview';
import IdeasOverview from '../components/Ideas/IdeasOverview';
import SettingsOverview from '../components/Settings/SettingsOverview';
import GamesComp from '../components/Games/GameComp';

export const useContent = ({activeTab, setActiveTab}) => {
    content = <OverviewComp setActiveTab={setActiveTab} />;
    switch(activeTab) {
        case 'O': {
            content = <OverviewComp setActiveTab={setActiveTab}/>
            break;
        }
        case 'T': {
            content = <TasksOverview />
            break;
        }
        case 'I': {
            content = <IdeasOverview />
            break;
        }
        case 'G': {
            content = <GamesComp />
            break;
        }
        case 'S': {
            content = <StatisticsComp activeTab={activeTab} setActiveTab={setActiveTab}/>
            break;
        }
        case 'F': {
            content = <AudioFilesOverview />
            break;
        }
        case 'P': {
            content = <SettingsOverview />
            break;
        }
        default:
            content = <OverviewComp setActiveTab={setActiveTab}/>
    }
    return <BodyWrapper activeTab={activeTab} setActiveTab={setActiveTab}>{content}</BodyWrapper>
}