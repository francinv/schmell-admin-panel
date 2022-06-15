import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';
import { CustomText } from '../styles/Typography';
import { SIDEBAR_ELEMENTS, SIDEBAR_WIDTH } from '../../constants/sidebar';

const CustomListItem = styled(ListItem)(({ theme }) => ({
    height:'56px',
    color: '#e0e000',
}));

const SideBar = ({ activeTab, setActiveTab }) => {

    const getStyling = isWanted => {
        if (isWanted === activeTab) {
            const styling = {
                opacity: 1,
                borderLeft: '3px solid #e0e000',
                background: 'rgba(159,162,180,0.08)',
                
            }
            return styling
        } else {
            const styling = {
                opacity: 0.5,
            }
            return styling
        }
    };

  return (
      <Drawer
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          fontFamily:'Quicksand',
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
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
            {SIDEBAR_ELEMENTS.map(element => (
                    <CustomListItem
                        key={element.value}
                        button
                        onClick={() => setActiveTab(element.value)}
                        sx={getStyling(element.value)}
                    >
                        <ListItemIcon>{element.icon}</ListItemIcon>
                        <ListItemText><CustomText>{element.label}</CustomText></ListItemText>
                    </CustomListItem>))}
        </List>
        <Divider />
        <List>
            <CustomListItem 
                button 
                sx={getStyling('P')}
                onClick={() => {
                    setActiveTab('P');
                }}>
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