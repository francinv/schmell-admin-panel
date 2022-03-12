import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/user/userSelectors";
import SmallContainer from "./Layout/SmallContainer";
import {H3, H4} from '../styles/Typography';
import ChangeProfileComp from "./ChangeProfile";
import { Box } from "@mui/material";
import ChangeProfilePic from "./ChangeProfilePic";
import {updateUser} from '../../features/user/userSlice';
import { useAppDispatch } from "../../features/hooks";

const actionDispatch = (dispatch) => ({
    updateUser: (query) => dispatch(updateUser(query))
})

const ProfileInfo = () => {
    const user = useSelector(selectActiveUser);
    const {updateUser} = actionDispatch(useAppDispatch());
    const [values, setValues] = useState({
        username: user.username,
        email: user.email,
        password: '**********',
        mobile_number: user.mobile_number,
        alerts_task: user.alerts_task,
        alerts_deadlines: user.alerts_deadlines
    });
    const [fileState, setFileState] = useState('');

    const [changeEmailState, setChangeEmailState] = useState(false);
    const [changePasswordState, setChangePasswordState] = useState(false);
    const [changeMobileState, setChangeMobileState] = useState(false);
    const [changeFileState, setChangeFileState] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        let data = new FormData();
        data.append('username', values.username);
        data.append('email', values.email);
        data.append('password', values.password);
        data.append('mobile_number', values.mobile_number);
        data.append('profile_picture', fileState);
        const dataToSend = {
            id: user.id,
            content: data
        };
        updateUser(dataToSend);
    }

    return (
        <SmallContainer>
            <Box sx={{
                width: '85%',
            }}>
                <H3 sx={{marginBottom: '2rem'}}>Profil</H3>
                <ChangeProfileComp 
                    changeStatus={changeEmailState} 
                    label={'E-post:'} 
                    onChange={handleChange('email')} 
                    setChangeStatus={setChangeEmailState}
                    type={'email'}
                    value={values.email}
                    handleSubmit={handleSubmit}
                />
                <ChangeProfileComp 
                    changeStatus={changePasswordState} 
                    label={'Passord:'} 
                    onChange={handleChange('password')} 
                    setChangeStatus={setChangePasswordState}
                    type={'password'}
                    value={values.password}
                    handleSubmit={handleSubmit}
                />
                <ChangeProfileComp 
                    changeStatus={changeMobileState} 
                    label={'Mobilnummer:'} 
                    onChange={handleChange('mobile_number')} 
                    setChangeStatus={setChangeMobileState}
                    type={'tel'}
                    value={values.mobile_number}
                    handleSubmit={handleSubmit}
                />
            </Box>
            <ChangeProfilePic setFileState={setFileState} changeStatus={changeFileState} handleSubmit={handleSubmit} setChangeStatus={setChangeFileState} />
        </SmallContainer>
    )
}

export default ProfileInfo;