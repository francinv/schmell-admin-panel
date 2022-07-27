import React from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import { H4 } from "../../styles/Typography";
import { useSelector } from 'react-redux';
import { selectAllUsers } from "../../../features/user/userSelectors";
import { resetStatus, setResponsibleState } from "../../../features/tasks/taskSlice";
import { useAppDispatch } from "../../../features/hooks";
import { selectResponsibleState } from "../../../features/tasks/taskSelectors";
import { InnerContainer, OuterContainer } from "./StyledComponents";

const actionDispatch = (dispatch) => ({
    setResponsible: (query) => dispatch(setResponsibleState(query)),
    resetStat: () => dispatch(resetStatus())
});

const Responsible = () => {
    const { setResponsible, resetStat } = actionDispatch(useAppDispatch());

    const responsible = useSelector(selectResponsibleState);
    const users = useSelector(selectAllUsers);

    const getOpacity = value => responsible === value ? 1 : 0.5;

    const handleClick = (value) => {
        resetStat();
        setResponsible(value);
    };

    return (
        <OuterContainer>
            <H4>Ansvarlig</H4>
            <InnerContainer>
                {users.map((user) => (
                    <IconButton
                        key={user.id}
                        sx={{
                            marginLeft: '0.2rem',
                            marginRight: '0.2rem',
                            opacity: getOpacity(user.id)
                        }}
                        onClick={() => handleClick(user.id)}
                    >
                        <Avatar
                            alt={user.username}
                            src={user.profile_picture}
                            sx={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </IconButton>
                ))}   
            </InnerContainer>
        </OuterContainer>
    );
};

export default Responsible;