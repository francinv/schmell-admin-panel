import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({open, handleShow, handleDelete}) => {

  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShow}
    >
        <DialogTitle sx={{fontFamily: 'Quicksand', fontSize: 20, fontWeight: 500,}}>{"Ønsker du å slette dette elementet?"}</DialogTitle>
        <DialogActions>
            <Button 
                onClick={handleShow}
                sx={{
                    fontFamily: 'Quicksand',
                    fontSize: 14,
                    color: 'green',
                }}
            >Nei</Button>
            <Button 
                onClick={handleDelete}
                sx={{
                    fontFamily: 'Quicksand',
                    fontSize: 14,
                    color: 'black',
                    bgcolor: '#e0e000',
                    '&:hover': {
                        bgcolor: '#f0f080'
                    }
                }}    
            >Ja</Button>
        </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;