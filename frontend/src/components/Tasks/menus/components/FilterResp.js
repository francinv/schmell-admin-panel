import React from "react";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { H4 } from "../../../styles/Typography";
import { selectAllUsers } from "../../../../features/selectors";
import { useSelector } from 'react-redux';

const FilterResponsible = ({setResponsible, responsible}) => {
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