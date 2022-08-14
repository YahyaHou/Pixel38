import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [register,setRegister] = useState({
    
    first_name: "",
    address: "",
    phone_number:"",
    email:"",
    password:""

  });

  const handleChange = (e) => {
    setRegister({...register,[e.target.name] : e.target.value});
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    
    const customerData = {
      first_name: register.first_name,
      address:register.address,
      phone_number:register.phone_number,
      email : register.email,
      password : register.password
    }
    axios.post('http://localhost:8000/api/register',customerData)
    .then((res)=>{
      const cookies = new Cookies();
      const token = cookies.set("TOKEN", res.data.token, { path: "/" });
      navigate('/dashboard/customer');
      Swal.fire({
        icon: "success",
        title: "Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err)=>{
      if(err.response.status === 400){
        Swal.fire({
          icon: "error",
          title: "All Fields Are Required",
          showConfirmButton: false,
          timer: 1500,
        });
        
      }else if(err.response.status === 500){
        Swal.fire({
          icon: "error",
          title: "something went wrong try again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="first_name"
                  label="First Name"
                  type="text"
                  id="first_name"
                  value={register.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  value={register.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone Number"
                  type="phone"
                  id="phone"
                  value={register.phone_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={register.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={register.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}