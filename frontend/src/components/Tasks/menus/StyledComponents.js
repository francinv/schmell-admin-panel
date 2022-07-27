import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const OuterContainer = styled(Box)(({ _theme }) => ({
    marginTop: '1rem',
    display:'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #C5C7CD',
    paddingLeft: '0.8rem',
    paddingTop: '0.8rem',
}));

export const InnerContainer = styled(Box)(({ _theme }) => ({
    display: 'flex',
    marginTop: '1rem',
    marginBottom: '1rem',
}));
