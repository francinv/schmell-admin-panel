import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterPriority from './components/FilterPriority';
import FilterStatus from './components/FilterStatus';
import FilterResponsible from './components/FilterResp';

const FilterMenu = (
    {priority, setPriority, status, setStatus, responsible, setResponsible}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <React.Fragment>
      <Button
        id="sort-button"
        onClick={handleShowMenu}
        startIcon={<FilterListIcon sx={{color:'#C5C7CD'}}/>}
        sx={{
          color: '#4B506D',
          fontFamily: 'Quicksand',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Filter
      </Button>
      <Drawer
        anchor='right'
        open={open}
        onClose={handleClose}
      >
        <FilterPriority 
            priority={priority}
            setPriority={setPriority}
        />
        <FilterStatus 
            status={status} 
            setStatus={setStatus}
        />
        <FilterResponsible
            responsible={responsible}
            setResponsible={setResponsible}
        />
        <Button
          sx={{
            bgcolor: '#e0e000',
            color: '#141400',
            fontFamily: 'Quicksand',
            fontSize: '14px',
            fontWeight: 500,
            borderRadius: '0px',
            '&:hover':{
                bgcolor: '#141400',
                color: '#e0e000',
            },
          }}
          onClick={() => {
            setPriority('');
            setResponsible('');
            setStatus('');
          }}
        >Nullstill filtere</Button>
      </Drawer>
    </React.Fragment>
  );
}


export default FilterMenu;