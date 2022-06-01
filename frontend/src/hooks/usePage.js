import React from 'react';
import BodyWrapper from '../components/layout/BodyWrapper';
import AudioFiles from '../pages/AudioFiles';
import Games from '../pages/Games';
import Ideas from '../pages/Ideas';
import Overview from '../pages/Overview';
import Settings from '../pages/Settings';
import Statistics from '../pages/Statistics';
import Tasks from '../pages/Tasks';

const usePage = ({ activeTab, setActiveTab }) => {
    let content = <Overview setActiveTab={setActiveTab} />;
    switch(activeTab) {
        case 'O': {
            content = <Overview setActiveTab={setActiveTab} />
            break;
        }
        case 'T': {
            content = <Tasks />
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
            content = <Statistics />
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