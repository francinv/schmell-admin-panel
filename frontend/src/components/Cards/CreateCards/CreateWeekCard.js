import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Box, FormControl, IconButton, OutlinedInput } from "@mui/material";
import { useAppDispatch } from "../../../features/hooks";
import { useSelector } from "react-redux";
import { postWeek } from "../../../features/weeks/weekSlice";
import { selectedGame } from "../../../features/games/gameSelectors";
import CreateContainer from '../CreateContainer';

const actionDispatch = (dispatch) => ({
    addWeek: (query) => dispatch(postWeek(query))
})

const CreateWeekCard = () => {
    const { addWeek } = actionDispatch(useAppDispatch());
    const game = useSelector(selectedGame);
    const [values, setValues] = useState({
        week_number: '',
        game: game.id
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addWeek(values);
        values.week_number = '';
    }

    return (
        <CreateContainer width="20%">
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
                        type="number"
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
        </CreateContainer>
    );
}

export default CreateWeekCard;