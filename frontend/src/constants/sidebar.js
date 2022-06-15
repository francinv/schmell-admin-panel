import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export const SIDEBAR_WIDTH = 255;
export const SIDEBAR_ELEMENTS = [
    {
        value: 'O',
        label: 'Oversikt',
        icon: <HomeIcon htmlColor="#e0e000"/>,
    },
    {
        value: 'T',
        label: 'Oppgaver',
        icon: <EventAvailableIcon htmlColor="#e0e000"/>,
    },
    {
        value: 'I',
        label: 'Ideer',
        icon: <LightbulbIcon htmlColor="#e0e000"/>,
    },
    {
        value: 'G',
        label: 'Spill',
        icon: <SportsEsportsIcon htmlColor="#e0e000"/>,
    },
    {
        value: 'S',
        label: 'Statistikk',
        icon: <EqualizerIcon htmlColor="#e0e000"/>,
    },
    {
        value: 'F',
        label: 'Lydfiler',
        icon: <LibraryMusicIcon htmlColor="#e0e000"/>,
    }
];