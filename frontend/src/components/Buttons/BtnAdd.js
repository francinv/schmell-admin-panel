import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledBtn = styled(Button)(({ _theme }) => ({
    backgroundColor: '#e0e000',
    color: '#141400',
    fontFamily: 'Quicksand',
    fontSize: '14px',
    fontWeight: 700,
    '&:hover':{
        backgroundColor: '#141400',
        color: '#e0e000',
    },
    '& .MuiButton-endIcon':{
        fontSize:'50px',
    },
}));

const BtnAdd = ({ handleClick, borderRadius, btnText, endIcon }) => {
    return (
        <StyledBtn
            endIcon={endIcon}
            onClick={handleClick}
            sx={{borderRadius: borderRadius}}
        >
            {btnText}
        </StyledBtn>
    );
};

export default BtnAdd;