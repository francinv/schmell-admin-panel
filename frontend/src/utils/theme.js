import { createTheme } from "@mui/material";
import { nbNO } from '@mui/material/locale';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Quicksand',
            
        ].join(','),
        fontSize: 14,
    },
    nbNO,
});