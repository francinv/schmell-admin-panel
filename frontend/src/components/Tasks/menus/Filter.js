import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Drawer } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { resetStatus, setPriorityState, setResponsibleState, setStatusState } from '../../../features/tasks/taskSlice';
import { useAppDispatch } from '../../../features/hooks';
import Priority from './Priority';
import Responsible from './Responsible';
import Status from './Status';

const actionDispatch = (dispatch) => ({
  setPriority: (query) => dispatch(setPriorityState(query)),
  setResponsible: (query) => dispatch(setResponsibleState(query)),
  setStatus: (query) => dispatch(setStatusState(query)),
  resetStatus: () => dispatch(resetStatus())
})

const Filter = () => {
  const { setPriority, setResponsible, setStatus, resetStatus } = actionDispatch(useAppDispatch());

  const [isFilterShown, setIsFilterShown] = useState(false);

  const handleShow = () => {
    setIsFilterShown((wasOpen) => !wasOpen);
  };

  return (
    <React.Fragment>
      <Button
        id="sort-button"
        onClick={handleShow}
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
        open={isFilterShown}
        onClose={handleShow}
      >
        <Priority />
        <Status />
        <Responsible />
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
            resetStatus();
            setPriority('');
            setResponsible('');
            setStatus('');
          }}
        >Nullstill filtere</Button>
      </Drawer>
    </React.Fragment>
  );
}


export default Filter;