import { Button } from "@mui/material";
import React from "react";

const BtnSubmit = ({ endIcon, btnText, width }) => {
    return (
        <Button
            type="submit"
            endIcon={endIcon}
            sx={{
                bgcolor: '#e0e000',
                color: '#141400',
                fontFamily: 'Quicksand',
                fontSize: '14px',
                fontWeight: 700,
                width: width || '40%',
                marginTop: '1.5rem',
                '&:hover':{
                    bgcolor: '#141400',
                    color: '#e0e000',
                }
            }}
        >{btnText}</Button>
    );
};

export default BtnSubmit;