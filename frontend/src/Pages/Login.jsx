import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

export default function Login() {


  const navigate = useNavigate();

  const [login,setLogin] = useState({

    email : "",
    password : ""

  });

  // HandleChange function  is used to change the state of the input 
  const handleChange = (e) => {
    setLogin({...login,[e.target.name]: e.target.value });
  };

  // Handle Submit is a function that will handle the login of the user with provided credentials
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const customerData = {
      email : login.email,
      password: login.password
    };

    axios.post('http://localhost:8000/api/login',customerData)
    .then((res) => {
      if(res.status === 200){
        // initialzing cookies to store the token inside it
        const cookies = new Cookies();
        // setting the token inside cookies and allowing it to be used in all paths
        cookies.set("TOKEN",res.data.token, {path: "/"});
        /* we set the interval function here to run the code below which will redirect the 
          authenticated user to the dashboard after interval of time which is 1000
        */
        setInterval(() => {
          navigate('/dashboard/customer');
        },1000);
        // then we clear the interval once he is navigated successfully
        clearInterval();
        Swal.fire({
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }).catch((err) =>  new Swal(err.response.data.error));
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              value={login.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              value={login.password}
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}