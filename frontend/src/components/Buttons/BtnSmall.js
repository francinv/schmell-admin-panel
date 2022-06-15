import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledBtn = styled(Button)(({ theme }) => ({
    color: '#e0e000',
    backgroundColor: "black",
    fontFamily: 'Quicksand',
    marginLeft: 'auto',
    alignSelf: 'center',
    '&:hover': {
        backgroundColor: '#666666',
    },
}));

const BtnSmall = ({ onClick, btnText }) => <StyledBtn onClick={onClick}>{btnText}</StyledBtn>;

export default BtnSmall;