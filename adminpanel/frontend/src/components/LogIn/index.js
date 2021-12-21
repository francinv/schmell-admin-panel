import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
});

const LogIn = () => {
    const [values, setValues] = React.useState({
        password: '',
        email: '',
        showPassword: false,
    });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Container 
        component="main"
        maxWidth="false"
        sx={{
            margin:0,
            width:'1',
            height:'100vh',
            bgcolor:'#363740',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }}
      >
        <Box
            sx={{
                width:'30%',
                height:'80%',
                bgcolor:'#fff',
                borderRadius: 8,
                flexDirection:'column',
                display:'flex',
                alignItems:'center',
            }}
        >
            <img className='img_logo' src="/static/images/assetlogo.png" width={350}/>
            <Typography 
                component="h1" 
                variant="h5"
                sx={{
                    fontFamily:'Quicksand',
                    fontSize:34,
                    fontWeight:600,
                }}
            >Logg inn på panelet</Typography>
            <FormControl sx={{ m: 1, width: '80%', margin: '3rem'}} variant="outlined">
                <InputLabel 
                  htmlFor="email-field" 
                  sx={{
                      fontFamily:'Quicksand', 
                      '&.Mui-focused': {
                          color: 'black',
                      },
                    }}>
                      E-post</InputLabel>
                <OutlinedInput
                    id="email-field"
                    type={'email'}
                    value={values.email}
                    onChange={handleChange('email')}
                    label="E-post"
                    color='secondary'
                    sx={{
                      fontFamily:'Quicksand',

                    }}
                    className="input-sign-in"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '80%'}} variant="outlined">
                <InputLabel 
                  htmlFor="password-field" 
                  sx={{
                    fontFamily:'Quicksand',
                    '&.Mui-focused': {
                      color: 'black',
                    },
                  }}>Passord</InputLabel>
                <OutlinedInput
                    id="password-field"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Passord"
                    sx={{
                      color:'black',
                      fontFamily:'Quicksand',
                      
                    }}
                    className="input-sign-in"
                />
                <Box
                  sx={{
                    display:'flex',
                    flexDirection: 'row-reverse',
                  }}
                >
                  <Link
                    sx={{
                      fontFamily:'Quicksand',
                      color:'#9FA2B4',
                      textDecorationColor:'#9FA2B4',
                      cursor:'pointer',
                      '&:hover': {
                        color:'#141400',
                        textDecorationColor:'#141400',
                      }
                    }}
                  >Glemt passord?</Link>
                </Box>
            </FormControl>
            <Button 
              variant='contained'
              sx={{
                width:'80%',
                height:48,
                bgcolor:'#E0E000',
                color:'#141400',
                marginTop:'5 rem',
                fontFamily:'Quicksand',
                fontWeight:500,
                fontSize:14,
                '&:hover': {
                  color:'#fff',
                }
              }}
            >
              Logg inn
            </Button>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default LogIn;