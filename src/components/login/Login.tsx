import { Alert, AlertColor, Box, Button, CircularProgress, Snackbar, SnackbarCloseReason, TextField, Typography } from '@mui/material'
import React, {ChangeEvent, useState} from 'react'
import { loginUser } from '../../services/auth.service';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

export interface LoginFormInterface {
    emailID: string;
    password: string;
}

function Login() {

    const {login, isAuthenticated} = useAuth();
    const router = useNavigate();
    const initialValues = {
        emailID: '',
        password: ''
    }

    const [loginFormValues, setLoginFormValues] = useState<LoginFormInterface>(initialValues);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = useState<AlertColor>("error");
    const [loginMessage, setLoginMessage] = useState('Login')
    const [error, setError] = useState({
        emailID: '',
        password: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setLoginFormValues({
            ...loginFormValues,
            [name]: value
        })
        setError({
            ...error,
            [name] : ""
        })
    }

    const emailValidation = () => {
        return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginFormValues.emailID))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        let formErrors = {
            emailID: '',
            password: ''
        }
        setError(formErrors)

        if(!loginFormValues.emailID.trim()) {
            valid = false;
            formErrors.emailID = "Email ID is required"
        } 
        if(!loginFormValues.password.trim()) {
            valid = false;
            formErrors.password = "Password is required"
        } else if(emailValidation()) {
            valid = false;
            formErrors.password = "Invalid Email Id"
        }
        setError(formErrors);

        if(valid) {
            try {
                loginUser(loginFormValues, login).then((response) => {
                    if(response.status === 200)
                    {
                        setOpen(true);
                        setSeverity('success');
                        setLoginMessage("Logged In Successfully");
                        setLoading(true);
                        setTimeout(() => {
                            router('/home'); // Redirect to the home page
                          }, 2000);
                    } else if(response.status === 400) {
                        setOpen(true);
                        setSeverity('warning');
                        setLoginMessage("Invalid Credentials");
                    }
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch(error) {
                setOpen(true);
                        setSeverity('error');
                        setLoginMessage("Login Failed! Plase try again");
                        setLoginFormValues(initialValues);
            } finally {
                setLoading(false);
            }
            
        }
        console.log("error ", error)
    }

    

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

  return (
    <Box
    sx={{
        position: 'relative',
      width: '100%',
      height: '700px',
      margin: '0 auto',
      padding: '20px',
      backgroundImage: 'url(bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
    <Box sx={{
        margin: '0 auto',
        marginTop: "10%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '25%',
        textAlign: 'center'
    }}>
        <Typography component="h1">
            Login to your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
            required
            fullWidth
            margin="normal"
            id="email"
            size="small"
            label="Enter your Email ID"
            name="emailID"
            error={!!error.emailID}
            helperText={error.emailID}
            value={loginFormValues.emailID}
            onChange={handleInputChange}
            autoFocus />
            <TextField
            required
            fullWidth
            type='password'
            margin="normal"
            id="password"
            label="Enter your Password"
            name="password"
            size="small"
            error={!!error.password}
            helperText={error.password}
            value={loginFormValues.password}
            onChange={handleInputChange}
            autoFocus />
            <Button type="submit" variant='outlined'>
            Login
            </Button>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px'}}>
        <span>Don't have an account? </span>
        <a href="/register">Register</a>
        </Box>
        {loading && <CircularProgress size={128} color="inherit" />}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {loginMessage}
                </Alert>
            </Snackbar>
    </Box>
    </Box>
  )
}

export default Login
