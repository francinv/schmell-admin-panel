import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectComments } from "../../features/comments/commentSelectors";
import { getFullDate } from "../../utils/taskUtil";

const Comments = () => {
    const comments = useSelector(selectComments);

    if (comments.length != 0)  {
        return (
            <>
            {(comments.map((comment)=> (
                <Box
                    sx={{
                        width: '90%',
                        marginTop: '0.2rem',
                        marginBottom: '0.2rem'
                    }}
                    key={comment.id}
                >
                    <Typography sx={{fontSize: 8, color: '#808080'}}>{getFullDate(comment.date)}</Typography>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            bgcolor: '#fff',
                            borderRadius: '8px',
                            alignItems: 'center',
                            padding: '0.2rem 0.5rem 0.2rem 0.2rem',
                        }}
                    >
                        <Avatar 
                            alt={comment.written_by.username}
                            src={comment.written_by.profile_picture}
                            sx={{width: 25, height: 25}}
                        />
                        <Typography sx={{fontSize: 12, marginLeft:'auto'}}>{comment.comment}</Typography>
                    </Box>
                </Box>
            )))}
            </>
        )
    }
    else {
        return null;
    }
}

export default Comments;