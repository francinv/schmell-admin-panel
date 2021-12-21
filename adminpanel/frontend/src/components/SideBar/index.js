import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';

const drawerWidth = 255;



const SideBar = ({activeTab, setActiveTab}) => {

    const CustomListItem = styled(ListItem)(({ theme }) => ({
        height:'56px',
        color: '#e0e000',
        fontFamily: 'Quicksand',
    }));

    const CustomText = styled(Typography)(({ theme }) => ({
        fontFamily: 'Quicksand',
    }));

    function getOpacity(isWanted) {
        if (isWanted === activeTab) {
            return 1;
        } else {
            return 0.5;
        }
    }

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          fontFamily:'Quicksand',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:'#363740',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar 
            sx={{
                paddingLeft:0,
                paddingRight:0,
                marginLeft: 'auto',
                marginRight: 'auto',
                '@media (min-width: 600px)': {
                    paddingLeft:0,
                    paddingRight:0,
                }
            }}>
            <img alt="Schmell logo" className='img_logo' src="/static/images/assetlogo.png" width={230}/>
        </Toolbar>
        <List 
            sx={{
                marginTop:6,
                marginBottom:8,
            }}
        >
            <CustomListItem 
                button 
                key="overview" 
                sx={{
                    opacity: getOpacity('O'),
                }}
            >
                <ListItemIcon>
                    <HomeIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <ListItemText>
                    <CustomText>Oversikt</CustomText>

                </ListItemText>
            </CustomListItem>
            <CustomListItem 
                button 
                key="tasks" 
                sx={{
                    opacity: getOpacity('T'),
                }}
            >
                <ListItemIcon>
                    <EventAvailableIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <CustomText>Oppgaver</CustomText>
            </CustomListItem>
            <CustomListItem button key="idea" sx={{opacity: getOpacity('I'),}}>
                <ListItemIcon>
                    <LightbulbIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <CustomText>Ideer</CustomText>
            </CustomListItem>
            <CustomListItem button key="games" sx={{opacity: getOpacity('G'),}}>
                <ListItemIcon>
                    <SportsEsportsIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <CustomText>Spill</CustomText>
            </CustomListItem>
            <CustomListItem button key="statistics" sx={{opacity: getOpacity('S'),}}>
                <ListItemIcon>
                    <EqualizerIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <CustomText>Statistikk</CustomText>
            </CustomListItem>
        </List>
        <Divider />
        <List>
            <CustomListItem button key="settings" sx={{opacity: getOpacity('P'),}}>
                <ListItemIcon>
                    <SettingsIcon htmlColor="#e0e000"/>
                </ListItemIcon>
                <CustomText>Innstillinger</CustomText>
            </CustomListItem>
        </List>
      </Drawer>
  );
}

export default SideBar;