import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import YourLogo from './assets/images/lanchan.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      R_email: data.get('R_email'),
      R_Password: data.get('R_Password')
    };

    console.log('Sending login request with data:', jsonData);

    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => {
        console.log('Received response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Parsed response data:', data);
        if (data.status === 'ok') {
          console.log('Login successful. Token:', data.token, 'Role:', data.role);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          if (data.role === 'owner') {
            window.location = 'ownerpage';
          } else {
            window.location = '/firstpageem';
          }
        } else {
          console.log('Login failed:', data.message);
          alert('Login failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login');
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 4,
              py: 6,
            }}
          >
            <img src={YourLogo} alt="Logo" style={{ width: 56, height: 56, marginBottom: 16 }} />
            <Typography component="h1" variant="h5" align="center">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="R_email"
                label="Email Address"
                name="R_email"
                autoComplete="R_email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="R_Password"
                label="R_Password"
                type="password"
                id="R_Password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
