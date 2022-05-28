import React from "react";
import { Box } from "@mui/material";
import { H3 } from "../styles/Typography";

const QuestionWrapper = (
    { children, component, handleSubmit, cardTitle, cardHeaderContent }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '16.67%',
                bgcolor:'#E5E5E5',
                marginTop: '1rem',
                marginBottom: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '8px',
            }}
            component={component}
            onSubmit={handleSubmit}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                }}
            >
                <H3 sx={{color:'#9FA2B4'}}>{cardTitle}</H3>
                {cardHeaderContent}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '95%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingBottom: '1rem',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default QuestionWrapper;