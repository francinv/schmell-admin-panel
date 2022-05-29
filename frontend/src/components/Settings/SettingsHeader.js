import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/user/userSelectors";
import { CARD_TEXT, H2 } from "../styles/Typography";

const SettingsHeader = () => {
    const user = useSelector(selectActiveUser);

    return (
        <Box
            sx={{
                width: '95%',
                margin: '1rem auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <H2 sx={{textAlign:'left'}}>Hei, {user.first_name} {user.last_name}</H2>
            <CARD_TEXT>Her har du mulighet for å endre dine innstillinger og informasjon</CARD_TEXT>
        </Box>
    )
}

export default SettingsHeader;