import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledOuterContainer = styled(Box)(({ _theme }) => ({
    width: '95%',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
}));