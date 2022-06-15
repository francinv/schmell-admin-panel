import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledOuterContainer = styled(Box)(({ theme }) => ({
    width: '95%',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
}));