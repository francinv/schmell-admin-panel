import React from "react";
import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectActiveUser } from '../../features/user/userSelectors';
import { postIdea } from '../../features/ideas/ideaSlice';
import { useAppDispatch } from "../../features/hooks";

const actionDispatch = (dispatch) => ({
    postIdea: (query) => dispatch(postIdea(query)),
})

const CreateIdeaComp = ({setStateChange}) => {
    const user = useSelector(selectActiveUser);

    const [values, setValues] = React.useState({
        text: '',
        category: 'EM',
        user_id: user.id
    });

    const { postIdea } = actionDispatch(useAppDispatch());

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postIdea(values);
        setStateChange(false);
    }
    
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: '6px 8px',
                bgcolor: '#e0e000',
                color: '#141400',
                borderTop: '1px solid #9FA2B4',
                borderRadius: '0px 0px 8px 8px',
                display:'flex',
                flexDirection: 'column',
            }}
        >
            <FormControl 
                fullWidth
                sx={{
                    height: '29px',
                }}
            
            >
                <Select
                    style={{
                        fontFamily: 'Quicksand',
                        color: '#141400',
                        fontSize: 14,
                    }}
                    sx={{
                        height: '29px',
                        color: '#141400',
                        bgcolor: '#E5E5E5',
                        '& .MuiSelect-select':{
                            padding: '0px 0px 0px 5px'
                        }
                    }}
                    value={values.category}
                    onChange={handleChange('category')}
                >   
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'EM'}>Velg kategori</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'G'}>Spill</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'D'}>Utvikling</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'W'}>Design</MenuItem>
                    <MenuItem sx={{fontFamily:'Quicksand', fontSize: 14}} value={'E'}>Diverse</MenuItem>
                </Select>
            </FormControl>
            <TextField
                placeholder="Min idé..."
                multiline
                rows={3}
                value={values.text}
                onChange={handleChange('text')}
                fullWidth
                sx={{
                    borderRadius: '8px',
                    bgcolor: '#e5e5e5',
                    marginTop: '0.8rem',
                    marginBottom: '0.8rem',
                    '& .MuiOutlinedInput-root':{
                        fontFamily: 'Quicksand',
                        color: '#141400',
                        fontSize: 14,
                        padding: '0.5rem',
                    }
                    
                }}

            />
            <Button
                type="submit"
                variant="outlined"
                sx={{
                    fontFamily: 'Quicksand',
                    color: '#141400',
                    fontSize: 14,
                    width: '60%',
                    borderColor: '#9FA2B4',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    '&: hover': {
                        borderColor: '#50515a',
                    }
                }}
            > post</Button>
        </Box>
    )
}

export default CreateIdeaComp;