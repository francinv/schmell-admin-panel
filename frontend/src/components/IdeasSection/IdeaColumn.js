import React, { useEffect, useState } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import { CARD_TEXT, H2 } from "../styles/Typography";
import { useSelector } from "react-redux";
import { selectIdeas } from '../../features/ideas/ideaSelectors';
import { getBorderRight, getColor, getType } from "../../utils/ideaUtil";
import DeleteDialog from '../Dialog/DeleteDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteIdea } from '../../features/ideas/ideaSlice';
import { useAppDispatch } from '../../features/hooks';

const actionDispatch = (dispatch) => ({
    removeIdea: (id) => dispatch(deleteIdea(id)),
})

const IdeaColumn = ({ categoryTitle, last }) => {
    const [open, setOpen] = useState(false);
    const [selectedIdeaId, setSelectedIdeaId] = useState(0);

    const ideas = useSelector(selectIdeas);

    const {removeIdea} = actionDispatch(useAppDispatch());

    const handleShow = (id) => {
        setOpen((wasOpen) => !wasOpen);
        setSelectedIdeaId(id);
    }
    const handleDelete = () => {
        removeIdea(selectedIdeaId);
        handleShow(null);
    }

    return (
        <Box
            sx={{
                width:'25%',
                borderRight: getBorderRight(last),
                paddingTop: '10px',
                paddingBottom: '10px',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    width: '90%',
                    marginBottom: '44.5px',
                    marginLeft:'auto',
                    marginRight: 'auto',
                    justifyContent: 'center',
                    backgroundColor: getColor(categoryTitle),
                }}
            >
                <H2>{categoryTitle}</H2>
            </Box>
            {ideas.filter(idea => idea.category === getType(categoryTitle)).map(idea => (
                <Box
                    sx={{
                        width: '60%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        minHeight: '110px',
                        backgroundColor: getColor(categoryTitle),
                        display: 'flex',
                        marginTop: '5.5px',
                        marginBottom: '5.5px',
                        borderRadius: '8px',
                        padding:'5px 5px 5px 10px',
                        flexDirection: 'row',
                        position: 'relative',
                    }}
                    key={idea.id}
                > 
                    <IconButton onClick={() => handleShow(idea.id)} sx={{color:'#141400', top: 0, right: 0, position: 'absolute'}}>
                        <DeleteIcon style={{fontSize: 24}} />
                    </IconButton>
                    <CARD_TEXT>{idea.text}</CARD_TEXT>
                    <Avatar
                        alt={idea.createdBy.username}
                        src={idea.createdBy.profile_picture}
                        sx= {{
                            width: 30,
                            height: 30,
                            marginTop: 'auto',
                            marginLeft: 'auto',
                        }}  
                    />
                </Box>
            ))}
            <DeleteDialog open={open} handleShow={handleShow} handleDelete={handleDelete} />
        </Box>
    );
}

export default IdeaColumn;