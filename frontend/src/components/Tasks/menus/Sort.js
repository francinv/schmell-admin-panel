import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { CARD_TEXT } from '../../styles/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { resetStatus, setSortState } from '../../../features/tasks/taskSlice';
import { useAppDispatch } from '../../../features/hooks';
import { useSelector } from 'react-redux';
import { selectSortState } from '../../../features/tasks/taskSelectors';
import { SORT_OPTIONS } from '../../../constants/taskConstants';

const actionDispatch = (dispatch) => ({
  setSort: (query) => dispatch(setSortState(query)),
  resetStatus: () => dispatch(resetStatus())
})

const CustomMenuItemContent = ({ value, sort, text }) => {
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

const Sort = () => {
  const { setSort, resetStatus } = actionDispatch(useAppDispatch());

  const sort = useSelector(selectSortState);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (value) => {
    resetStatus();
    setSort(value);
    handleClose();
  }

  return (
    <Box sx={{marginLeft:'auto'}}>
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
        {SORT_OPTIONS.map(option => (
            <MenuItem onClick={() => handleClick(option.type)} key={option.type}>
              <CustomMenuItemContent value={option.type} sort={sort} text={option.text} />
            </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}


export default Sort;