import React, { useState } from "react";
import { Avatar, ToggleButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../features/user/userSelectors";
import { CustomToggleButtonGroup } from "../styles";

export const PersonRadio = props => {
    const { onChange } = props;
    const users = useSelector(selectAllUsers);

    const [alignment, setAlignment] = useState('');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        const thisEvent = {
            target: {
                value: newAlignment
            }
        };
        onChange(thisEvent);
    }

    const getWidth = () => (1 / users.length) * 100;

    return (
        <CustomToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
        >
            {users.map((user) => (
                <ToggleButton value={user.id} key={user.id}
                    sx={{
                        border: 'none',
                        width: `${getWidth()}%`,
                        opacity: 0.5,
                        padding: '5px 0',
                        '&.Mui-selected': {backgroundColor:'#fff', opacity: 1},
                        '&:hover': {backgroundColor:'#fff', opacity: 0.75},
                        '&.Mui-selected:hover': {background:'none'},
                    }}
                >
                    <Avatar
                        value={user.id}
                        alt={user.username}
                        src={user.profile_picture}
                        sx={{width: 30,height: 30,}}
                    />
                </ToggleButton>
            ))}
        </CustomToggleButtonGroup>
    );
};