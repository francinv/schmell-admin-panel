import React from "react";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { H4 } from "../../../styles/Typography";
import { useSelector } from 'react-redux';
import { selectAllUsers } from "../../../../features/user/userSelectors";
import { resetStatus, setPriorityState, setResponsibleState, setStatusState } from "../../../../features/tasks/taskSlice";
import { useAppDispatch } from "../../../../features/hooks";
import { selectResponsibleState } from "../../../../features/tasks/taskSelectors";

const actionDispatch = (dispatch) => ({
    setResponsible: (query) => dispatch(setResponsibleState(query)),
    resetStatus: () => dispatch(resetStatus())
})

const FilterResponsible = () => {
    const { setResponsible } = actionDispatch(useAppDispatch());
    const { resetStatus } = actionDispatch(useAppDispatch());

    const responsible = useSelector(selectResponsibleState);
    const users = useSelector(selectAllUsers);

    function getOpacity(value){
        let opacity = '0.5';
        if (responsible === value) {
            opacity='1';
        }
        else {
            opacity = '0.5';
        }
        return opacity;
    }

    const handleClick = (value) => {
        resetStatus();
        setResponsible(value);
    }

    return (
        <Box 
            sx={{
                marginTop: '1rem',
                display:'flex',
                flexDirection: 'column',
                borderBottom: '1px solid #C5C7CD',
                paddingLeft: '0.8rem',
                paddingTop: '0.8rem'
            }}
            >
            <H4>Ansvarlig</H4>
            <Box
                sx={{
                    display: 'flex',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            >
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
                ))
                    
                }   
            </Box>
        </Box>
    )
}

export default FilterResponsible;