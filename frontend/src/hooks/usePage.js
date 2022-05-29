import React from 'react';
import StatisticsComp from '../components/Statistics';
import BodyWrapper from '../components/layout/BodyWrapper';
import TasksOverview from '../components/Tasks/TasksOverview';
import AudioFiles from '../pages/AudioFiles';
import Games from '../pages/Games';
import Ideas from '../pages/Ideas';
import Overview from '../pages/Overview';
import Settings from '../pages/Settings';

const usePage = ({ activeTab, setActiveTab }) => {
    content = <Overview setActiveTab={setActiveTab} />;
    switch(activeTab) {
        case 'O': {
            content = <Overview setActiveTab={setActiveTab} />
            break;
        }
        case 'T': {
            content = <TasksOverview />
            break;
        }
        case 'I': {
            content = <Ideas />
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
            content = <Settings />
            break;
        }
        default:
            content = <Overview setActiveTab={setActiveTab}/>
    }
    return <BodyWrapper activeTab={activeTab} setActiveTab={setActiveTab}>{content}</BodyWrapper>
}

export default usePage;