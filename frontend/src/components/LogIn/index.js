import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { logIn } from '../../features/user/userSlice';
import { useAppDispatch } from '../../features/hooks';
import { useSelector } from 'react-redux';
import { selectUserError, selectUserStatus } from '../../features/user/userSelectors';


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

const actionDispatch = (dispatch) => ({
  logIn: (query) => dispatch(logIn(query)),
});

export default function LogIn() {
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const [values, setValues] = React.useState({
    password: '',
    username: '',
    showPassword: false,
  });  
  const { logIn } = actionDispatch(useAppDispatch());
    
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

  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('username', values.username);
    data.append('password', values.password);
    logIn(data);
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
            component="form"
            onSubmit={HandleSubmit}
            noValidate
        >
            <img className='img_logo' style={{marginTop:'1rem'}} src="/static/images/assetlogo.png" width={350}/>
            <Typography 
                component="h1" 
                variant="h5"
                sx={{
                    fontFamily:'Quicksand',
                    fontSize:34,
                    fontWeight:600,
                    marginTop:'auto',
                }}
            >Logg inn på panelet</Typography>
            <FormControl sx={{ m: 1, width: '80%', margin: '3rem'}} variant="outlined">
                <InputLabel 
                  htmlFor="username-field" 
                  sx={{
                      fontFamily:'Quicksand', 
                      '&.Mui-focused': {
                          color: 'black',
                      },
                    }}>
                      Brukernavn</InputLabel>
                <OutlinedInput
                    id="username-field"
                    type={'username'}
                    value={values.username}
                    onChange={handleChange('username')}
                    label="Brukernavn"
                    color='secondary'
                    sx={{
                      fontFamily:'Quicksand',
                      '&.Mui-focused': {
                        color: 'black',
                      },
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
            </FormControl>
            <Button 
              variant='contained'
              type="submit"
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
                },
                marginBottom:'auto',
              }}
            >
              Logg inn
            </Button>
            {
              status === 'failed'
              ? <Alert severity='error' sx={{marginBottom: '0.5rem'}}>Feil brukernavn eller passord.</Alert>
              : null
            }
        </Box>

      </Container>
    </ThemeProvider>
  );
}
