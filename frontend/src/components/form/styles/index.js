import React from "react";
import { Typography, Box, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";

export const CustomWidthText = styled(Typography)(({ theme, fontSize, marginRight }) => ({
    fontFamily: 'Quicksand',
    fontSize: fontSize || 16,
    fontWeight: 500,
    width: '30%',
    marginRight: marginRight || '0.8rem',
}));

export const CustomContainerForm = styled(Box)(({ theme, width }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: width || '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
    marginBottom:'1rem',
    alignItems: 'center',
}));

export const CustomSmallContainerForm = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop:'0.3rem',
    marginBottom: '0.3rem',
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    marginTop: '1rem',
    marginBottom:'1rem',
    alignItems: 'center',
}));

export const FormText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Quicksand',
    fontSize: 16,
    fontWeight: 500,
    width: '25%',
    marginRight: '0.8rem',
}));

export const ColContainerForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    width: '70%',
    height: '29px',
    bgcolor: '#E5E5E5',
}))

export const ColSmallContainerForm = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    alignItems: 'center',
}));

export const inputStyle = {display: 'none'};