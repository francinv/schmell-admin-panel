import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';

const BtnIconSubmit = () => {
    return (
        <IconButton type="submit" sx={{color:'#000', marginLeft:'auto', marginRight:'0.5rem'}}>
            <CloudUploadIcon style={{fontSize: 24}} />
        </IconButton>
    );
};

export default BtnIconSubmit;