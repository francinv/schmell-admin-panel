import React from "react";
import { Box, Button } from "@mui/material";
import { H4 } from "../../styles/Typography";
import { resetStatus, setPriorityState } from "../../../features/tasks/taskSlice";
import { useAppDispatch } from "../../../features/hooks";
import { useSelector } from "react-redux";
import { selectPriorityState } from "../../../features/tasks/taskSelectors";
import { styled } from "@mui/system";
import { PRIORITY_OPTIONS } from "../../../constants/taskConstants";

const actionDispatch = (dispatch) => ({
    setPriority: (query) => dispatch(setPriorityState(query)),
    resetStatus: () => dispatch(resetStatus())
})

const PriorityBtn = styled(Button)(({theme}) => ({
    borderRadius: '100px',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: '#fff',
    fontFamily: 'Quicksand',
    fontSize:14,
    fontWeight: 500,
}));

const Priority = () => {
    const { setPriority, resetStatus } = actionDispatch(useAppDispatch());

    const priority = useSelector(selectPriorityState);
    
    const getOpacity = value => (priority === value) ? 1 : 0.5;

    const handleClick = (value) => {
        resetStatus();
        setPriority(value);
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
            <H4>Prioritet</H4>
            <Box
                sx={{
                    display: 'flex',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            >
                {PRIORITY_OPTIONS.map(priority => (
                    <PriorityBtn sx={{opacity: getOpacity(priority.value), backgroundColor: priority.color}} onClick={() => handleClick(priority.value)}>
                        {priority.text}
                    </PriorityBtn>
                ))}
            </Box>
        </Box>
    );
};

export default Priority;