import React from "react";
import { Box, Button } from "@mui/material";
import { H4 } from "../../styles/Typography";
import CheckIcon from '@mui/icons-material/Check';
import { resetStatus, setStatusState } from "../../../features/tasks/taskSlice";
import { useAppDispatch } from "../../../features/hooks";
import { useSelector } from "react-redux";
import { selectStatusState } from "../../../features/tasks/taskSelectors";
import { styled } from "@mui/system";
import { STATUS_OPTIONS } from "../../../constants/taskConstants";

const actionDispatch = (dispatch) => ({
    setStatus: (query) => dispatch(setStatusState(query)),
    resetStatus: () => dispatch(resetStatus())
})

const StyledBtnStatus = styled(Button)(({theme}) => ({
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: '#141400',
    fontFamily: 'Quicksand',
    fontSize:14,
    fontWeight: 500,
}))

const Status = () => {
    const { setStatus, resetStatus } = actionDispatch(useAppDispatch());

    const status = useSelector(selectStatusState);
    
    const isSelected = value => status === value ? <CheckIcon sx={{color: '#C5C7CD'}} /> : null;

    const handleClick = value => {
        resetStatus();
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
                {STATUS_OPTIONS.map(status => (
                    <StyledBtnStatus fullWidth onClick={() => handleClick(status.type)} endIcon={isSelected(status.type)}>
                        {status.text}
                    </StyledBtnStatus>
                ))}
            </Box>
        </Box>
    )
}

export default Status;