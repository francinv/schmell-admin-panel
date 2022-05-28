import React from 'react';
import OverviewComp from '../components/Overview/OverviewComp';
import StatisticsComp from '../components/Statistics';
import BodyWrapper from '../components/layout/BodyWrapper';
import TasksOverview from '../components/Tasks/TasksOverview';
import IdeasOverview from '../components/Ideas/IdeasOverview';
import SettingsOverview from '../components/Settings/SettingsOverview';
import AudioFiles from '../pages/AudioFiles';
import Games from '../pages/Games';

const usePage = ({activeTab, setActiveTab}) => {
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
            content = <Games />
            break;
        }
        case 'S': {
            content = <StatisticsComp activeTab={activeTab} setActiveTab={setActiveTab}/>
            break;
        }
        case 'F': {
            content = <AudioFiles />
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

export default usePage;