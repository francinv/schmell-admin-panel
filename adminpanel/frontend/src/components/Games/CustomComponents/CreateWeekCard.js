import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, IconButton, OutlinedInput } from "@mui/material";
import { setWeeks } from "../../../features/games/gameSlice";
import { useAppDispatch } from "../../../features/hooks";
import { fetchWeeks, postWeek } from "../../../core/APIfunctions";
import { useSelector } from "react-redux";
import { selectedGame, selectWeeks } from "../../../features/selectors";

const actionDispatch = (dispatch) => ({
    setWeeks: (query) => dispatch(setWeeks(query))
})

export const CreateWeekCard = () => {
    const { setWeeks } = actionDispatch(useAppDispatch());
    const weeks = useSelector(selectWeeks);
    const game = useSelector(selectedGame);
    const [values, setValues] = useState({
        week_number: '',
        game: game.id
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const initialWeeks = weeks;
        postWeek(values);
        setWeeks(await fetchWeeks(game.id));
        if (weeks === initialWeeks) {
            setWeeks(await fetchWeeks(game.id));
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
                bgcolor:'#F3F3F4',
                margin: '1rem',
                borderRadius: '8px',
            }}
        >
            <Box 
                component="form"
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    width: '100%',
                }}    
                onSubmit={handleSubmit}
            >
                <FormControl 
                    fullWidth 
                    sx={{
                        width: '70%',
                        height: '29px',
                    }}
                >
                    <OutlinedInput
                        value={values.week_number}
                        onChange={handleChange('week_number')}
                        placeholder="Uke 1-52" 
                        required
                        style={{
                            fontFamily: 'Quicksand',
                            color: '#000',
                            fontSize: 14,
                        }}
                        sx={{
                            borderRadius: '8px',
                            height: '29px',
                            bgcolor: '#E5E5E5',
                            '&.Mui-focused' : {
                                borderColor: '#000',
                            },
                        }}
                        
                    />
                </FormControl>
                <IconButton
                    type="submit"
                    size="large"
                    sx={{color:'#141400', alignSelf: 'flex-end'}}
                >
                    <AddIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}