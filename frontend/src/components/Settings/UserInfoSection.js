import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveUser } from "../../features/user/userSelectors";
import { H3 } from '../styles/Typography';
import { Box } from "@mui/material";
import {updatePassword, updateUser} from '../../features/user/userSlice';
import { useAppDispatch } from "../../features/hooks";
import { getLabels, getInputType } from "../../utils/settingsUtil";
import SmallContainer from "../layout/containers/SmallContainer";
import DisplayPicture from "./DisplayPicture";
import DisplayDetail from "./DisplayDetail";
import { FileButtonContainer, ProfileInputContainer } from "../form";

const actionDispatch = (dispatch) => ({
    changeUser: (query) => dispatch(updateUser(query)),
    changePassword: (query) => dispatch(updatePassword(query))
})

const Information = ({ value, changeState, onStateChange, label, type, onChange, handleSubmit }) => {

    return (
        <>
            {
                changeState
                ? <ProfileInputContainer label={label} value={value} type={type} onChange={onChange} handleSubmit={handleSubmit} stateChange={onStateChange}/>
                : <DisplayDetail label={label} value={value} handleClick={() => onStateChange(true)} />
            }
        </>
    )
}

const ProfilePic = ({setFileState, handleSubmit, changeStatus, setChangeStatus}) => {
    return (
        <>
            { changeStatus
                ?   <FileButtonContainer setFileState={setFileState} handleSubmit={handleSubmit} onStateChange={setChangeStatus} />
                :   <DisplayPicture setChangeStatus={setChangeStatus} />
            }
        </>
    )
}

const UserInfoSection = () => {
    const user = useSelector(selectActiveUser);

    const [values, setValues] = useState({
        email: user.email,
        password: '',
        mobile_number: user.mobile_number
    });
    const [fileState, setFileState] = useState('');
    const [changeState, setChangeState] = useState({
        email: false,
        mobile_number: false,
        password: false,
        file: false
    });
    

    const {changeUser, changePassword} = actionDispatch(useAppDispatch());

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleStateChange = (prop) => (newState) => {
        setChangeState({ ...changeState, [prop]: newState });
    };

    const handleSubmit = () => {
        let data = new FormData();
        const keys = Object.keys(values);
        keys.forEach(key => data.append(key, values[key]));
        data.append('profile_picture', fileState);
        const dataToSend = {
            id: user.id,
            content: data
        };
        if (values.password) {
            const passwordDataToSend = {
                id: user.id,
                content: values.password
            }
            changePassword(passwordDataToSend);
        }
        changeUser(dataToSend);
    };


    return (
        <SmallContainer>
            <Box sx={{
                width: '85%',
            }}>
                <H3 sx={{marginBottom: '2rem'}}>Profil</H3>
                {
                    Object.keys(values).map(key => (
                        <Information
                            key={key}
                            value={values[key]}
                            changeState={changeState[key]}
                            onStateChange={handleStateChange(key)}
                            label={getLabels(key)}
                            type={getInputType(key)}
                            onChange={handleChange(key)}
                            handleSubmit={handleSubmit}
                        />
                    ))
                }
            </Box>
            <ProfilePic setFileState={setFileState} changeStatus={changeState.file} handleSubmit={handleSubmit} setChangeStatus={handleStateChange('file')} />
        </SmallContainer>
    )
}

export default UserInfoSection;