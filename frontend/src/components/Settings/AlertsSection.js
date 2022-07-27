import React, { useState } from "react";
import { Box } from "@mui/material";
import { H3 } from '../styles/Typography';
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/user/userSelectors";
import { updateUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../features/hooks";
import SmallContainer from "../layout/containers/SmallContainer";
import { ToggleContainer } from "../form";

const actionDispatch = (dispatch) => ({
    changeUser: (query) => dispatch(updateUser(query)),
});

const AlertsSection = () => {
    const { changeUser } = actionDispatch(useAppDispatch());

    const user = useSelector(selectActiveUser);

    const [values, setValues] = useState({
        alerts_task: user.alerts_task,
        alerts_deadlines: user.alerts_deadlines
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.checked });
        const dataToSend = {
            id: user.id,
            content: {
                [prop]: event.target.checked
            }
        };
        changeUser(dataToSend);
    };

    return (
        <SmallContainer>
            <Box sx={{width: '85%'}}>
                <H3 sx={{marginBottom: '2rem'}}>Varslinger</H3>
                <ToggleContainer label="Ønsker varslinger om oppgaver:" onChange={handleChange('alerts_task')} value={values.alerts_task} />
                <ToggleContainer label="Ønsker varslinger om frister:" onChange={handleChange('alerts_deadlines')} value={values.alerts_deadlines} />
            </Box>
        </SmallContainer>
    );
}

export default AlertsSection;