import { Typography } from "@mui/material";
import { styled } from "@mui/system";


export const H1 = styled(Typography)(({theme}) => ({
    fontFamily:'Quicksand',
    fontSize:44,
    fontWeight:700,
}))

export const H2 = styled(Typography)(({theme}) => ({
    fontFamily:'Quicksand',
    fontSize:30,
    fontWeight:700,
    textAlign: 'center',
}))

export const CARD_TEXT = styled(Typography)(({theme}) => ({
    fontFamily: 'Quicksand',
    fontSize:14,
}))

export const BODY_BOLD = styled(Typography)(({theme}) => ({
    fontFamily: 'Quicksand',
    fontSize:14,
    fontWeight: 500,
}))

export const H3 = styled(Typography)(({theme}) => ({
    fontFamily:'Quicksand',
    fontSize:25,
    fontWeight:500,
}))
