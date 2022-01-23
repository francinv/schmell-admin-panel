import React from "react";
import { Box, Button } from "@mui/material";
import { H4 } from "../../../styles/Typography";
import CheckIcon from '@mui/icons-material/Check';

const FilterStatus = ({setStatus, status}) => {

    function isSelected(value){
        if (status === value) {
            return <CheckIcon sx={{color:'#C5C7CD'}}/>;
        }
    }

    const handleClick = (value) => {
        setStatus(value);
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
            <H4>Status</H4>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            >
                <Button
                    fullWidth
                    sx={{
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#141400',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                    }}
                    onClick={() => handleClick('P')}
                    endIcon={isSelected('P')}
                >
                    Ikke startet
                </Button>
                <Button
                    fullWidth
                    sx={{
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#141400',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                    }}
                    onClick={() => handleClick('D')}
                    endIcon={isSelected('D')}
                >
                    Doing
                </Button>
                <Button
                    fullWidth
                    sx={{
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#141400',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                    }}
                    onClick={() => handleClick('F')}
                    endIcon={isSelected('F')}
                >
                    Fullført
                </Button>
            </Box>
        </Box>
    )
}

export default FilterStatus;