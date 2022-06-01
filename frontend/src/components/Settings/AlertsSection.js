import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { H3 } from '../styles/Typography';
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/user/userSelectors";
import { updateUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../features/hooks";
import SmallContainer from "../layout/containers/SmallContainer";
import { ToggleContainer } from "../form";

const actionDispatch = (dispatch) => ({
    updateUser: (query) => dispatch(updateUser(query)),
});

const AlertsSection = () => {
    const { updateUser } = actionDispatch(useAppDispatch());
    const user = useSelector(selectActiveUser);
    const [n, setN] = useState(0);
    const [values, setValues] = useState({
        username: user.username,
        alerts_task: user.alerts_task,
        alerts_deadlines: user.alerts_deadlines
    });

    useEffect(() => {
        if (n !== 0) {
            const dataToSend = {
                id: user.id,
                content: values,
            };
            updateUser(dataToSend)
        }   
    }, [values]);
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.checked });
        setN(n+1);
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