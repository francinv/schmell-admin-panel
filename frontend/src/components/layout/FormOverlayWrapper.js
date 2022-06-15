import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const OuterContainer = styled(Box)(({ theme }) => ({
    width: '85%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
}));

const InnerContainer = styled(Box)(({ theme }) => ({
    width:'80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 2,
    paddingTop: 2,
    paddingBottom: 2,
}));

const FormOverlayWrapper = ({ children, handleSubmit }) => {
    return (
        <OuterContainer>
            <InnerContainer component="form" onSubmit={handleSubmit}>
                {children}
            </InnerContainer>
        </OuterContainer>
    );
};

export default FormOverlayWrapper;