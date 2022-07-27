import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CustomText = styled(Typography)(({ _theme }) => ({
    fontFamily: 'Quicksand',
}));

export const H1 = styled(Typography)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:44,
    fontWeight:700,
}))

export const H2 = styled(Typography)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:30,
    fontWeight:700,
    textAlign: 'center',
}))

export const CARD_TEXT = styled(Typography)(({_theme}) => ({
    fontFamily: 'Quicksand',
    fontSize:14,
}))

export const BODY_BOLD = styled(Typography)(({_theme}) => ({
    fontFamily: 'Quicksand',
    fontSize:14,
    fontWeight: 500,
}))

export const H3 = styled(Typography)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:25,
    fontWeight:500,
}))

export const H4 = styled(Typography)(({_theme}) => ({
    fontFamily:'Quicksand',
    fontSize:20,
    fontWeight:500,
}))

export const BODY_EXTRA_BOLD = styled(Typography)(({_theme}) => ({
    fontFamily: 'Quicksand',
    fontSize: '14px',
    fontWeight: 700,
}))

export const BODY_MEDIUM = styled(Typography)(({_theme}) => ({
    fontFamily: 'Quicksand',
    fontSize: '16px',
    fontWeight: 500,
}))

