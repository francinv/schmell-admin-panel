import { Box } from "@mui/material";
import React from "react";

const CreateContainer = ({ children, width }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: width,
                bgcolor: "#F3F3F4",
                margin: "1rem",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </Box>
    );
};

export default CreateContainer;