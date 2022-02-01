import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectComments } from "../../features/comments/commentSelectors";
import { getFullDate } from "../../utils/taskUtil";


export default function CommentBox() {
    const comments = useSelector(selectComments);

    console.log(comments.length);
    console.log(comments);
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