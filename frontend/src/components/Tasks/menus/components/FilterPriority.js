import React from "react";
import { Box, Button } from "@mui/material";
import { H4 } from "../../../styles/Typography";
import { resetStatus, setPriorityState, setResponsibleState, setStatusState } from "../../../../features/tasks/taskSlice";
import { useAppDispatch } from "../../../../features/hooks";
import { useSelector } from "react-redux";
import { selectPriorityState } from "../../../../features/tasks/taskSelectors";

const actionDispatch = (dispatch) => ({
    setPriority: (query) => dispatch(setPriorityState(query)),
    resetStatus: () => dispatch(resetStatus())
})

const FilterPriority = () => {
    const { setPriority } = actionDispatch(useAppDispatch());
    const { resetStatus } = actionDispatch(useAppDispatch());

    const priority = useSelector(selectPriorityState);
    
    function getOpacity(value){
        let opacity = '0.5';
        if (priority === value) {
            opacity='1';
        }
        else {
            opacity = '0.5';
        }
        return opacity;
    }

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
                <Button
                    sx={{
                        backgroundColor:'#FEC400',
                        borderRadius: '100px',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#fff',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                        opacity: getOpacity(3)
                    }}
                    onClick={() => handleClick(3)}
                >
                    LAV
                </Button>
                <Button
                    sx={{
                        backgroundColor:'#29CC97',
                        borderRadius: '100px',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#fff',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                        opacity: getOpacity(2)
                    }}
                    onClick={() => handleClick(2)}
                >
                    MEDIUM
                </Button>
                <Button
                    sx={{
                        backgroundColor:'#F12B2C',
                        borderRadius: '100px',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        color: '#fff',
                        fontFamily: 'Quicksand',
                        fontSize:14,
                        fontWeight: 500,
                        opacity: getOpacity(1)
                    }}
                    onClick={() => handleClick(1)}
                >
                    HØY
                </Button>
            </Box>
        </Box>
    )
}

export default FilterPriority;