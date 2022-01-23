import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { CARD_TEXT } from '../../styles/Typography';
import CheckIcon from '@mui/icons-material/Check';

const CustomMenuItemContent = ({value, sort, text}) => {

  return (
    <Box 
      sx={{
        display:'flex',
        alignItems:'center'
      }}
    >
      <CARD_TEXT>{text}</CARD_TEXT>
      {
        value === sort
        ? <CheckIcon sx={{fontSize:18, marginLeft:'0.2rem', color:'#C5C7CD'}}/>
        : null
      }
    </Box>
  )
}

const SortMenu = ({sort, setSort}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (value) => {
    setSort(value);
    handleClose();
  }

  return (
    <Box
      sx={{
        marginLeft:'auto',
      }}
    >
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleShowMenu}
        startIcon={<SortIcon sx={{color:'#C5C7CD'}}/>}
        sx={{
          color: '#4B506D',
          fontFamily: 'Quicksand',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Sortér
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
      >
        <MenuItem 
          onClick={()=>handleClick('PUBL_DESC')}
          key="PUBL_DESC"
        >
          <CustomMenuItemContent value='PUBL_DESC' sort={sort} text='Publisert'/> 
        </MenuItem>
        <MenuItem 
          onClick={()=>handleClick('PRIORITY_LTH')}
          key="PRIORITY_LTH"
        >
          <CustomMenuItemContent value='PRIORITY_LTH' sort={sort} text='Prioritet (lav til høy)'/> 
        </MenuItem>
        <MenuItem 
          onClick={()=>handleClick('PRIORITY_HTL')}
          key="PRIORITY_HTL"
        >
          <CustomMenuItemContent value='PRIORITY_HTL' sort={sort} text='Prioritet (høy til lav)'/> 
        </MenuItem>
        <MenuItem 
          onClick={()=>handleClick('DEADLINE_DESC')}
          key="DEADLINE_DESC"
        >
          <CustomMenuItemContent value='DEADLINE_DESC' sort={sort} text='Frist nyest - eldst'/> 
        </MenuItem>
        <MenuItem 
          onClick={()=>handleClick('DEADLINE_ASC')}
          key="DEADLINE_ASC"
        >
          <CustomMenuItemContent value='DEADLINE_ASC' sort={sort} text='Frist eldst - nyest'/> 
        </MenuItem>
      </Menu>
    </Box>
  );
}


export default SortMenu;