import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { H1 } from "../styles/Typography";
import CloseIcon from '@mui/icons-material/Close';

const styleContainer = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: '#F7F8FC',
    border: '1px solid #141400',
    boxShadow: 24,
    paddingTop: 0.5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 2,
    borderRadius: 8,
};

const ModalWrapper = ({ children, open, handleClose, modalTitle }) => {
    return (
        <Modal 
            open={open}
            onClose={handleClose}
        >
            <Box sx={styleContainer}>
                <Box 
                    sx={{
                        width: '100%',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent: 'flex-end',
                    }}
                >   
                    <IconButton
                        onClick={handleClose}
                        sx={{color:'#141400'}}
                    >
                        <CloseIcon style={{fontSize: 30}} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: '95%',
                        borderBottom: '1px solid #9FA2B4',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <H1>{modalTitle}</H1>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWrapper;