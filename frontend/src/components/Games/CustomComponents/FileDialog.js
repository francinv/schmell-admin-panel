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

const FileDialog = ({open, handleShow, dataSubmit}) => {

  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShow}
    >
        <DialogTitle sx={{fontFamily: 'Quicksand', fontSize: 20, fontWeight: 500,}}>{"Ønsker du å laste opp uten logo?"}</DialogTitle>
        <DialogActions>
            <Button 
                onClick={handleShow}
                sx={{
                    fontFamily: 'Quicksand',
                    fontSize: 14,
                    color: '#fff',
                    bgcolor: 'red',
                    borderRadius: '8px',
                    '&:hover': {
                        bgcolor: '#ff8080',
                    }
                }}
            >Nei</Button>
            <Button 
                onClick={dataSubmit}
                sx={{
                    fontFamily: 'Quicksand',
                    fontSize: 14,
                    color: '#fff',
                    bgcolor: '#008000',
                    borderRadius: '8px',
                    '&:hover':{
                        bgcolor: '#80c080',
                    }
                }}    
            >Ja</Button>
        </DialogActions>
    </Dialog>
  );
}

export default FileDialog;