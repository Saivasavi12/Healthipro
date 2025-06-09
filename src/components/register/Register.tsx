import { Label } from '@mui/icons-material';
import { Radio, RadioGroup } from '@mui/joy';
import { Box, Typography, TextField, Button, FormHelperText, InputLabel, Snackbar, SnackbarCloseReason, Alert, CircularProgress, AlertColor } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { ChangeEvent, useState } from 'react';
import { registerUser } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

export interface RegisterFormInterface {
    fullName: string;
    emailID: string;
    dateOfBirth: string;
    gender: string;
    mobileNumber: string;
    password: string;
}

function Register() {

    const router= useNavigate();
    const initialValues = {
        fullName: '',
        emailID: '',
        dateOfBirth: '',
        gender: 'female',
        mobileNumber: '',
        password: ''
    }

    const [registerFormValues, setRegisterFormValues] = useState<RegisterFormInterface>(initialValues);
    const [error, setError] = useState({
        fullName: '',
        emailID: '',
        dateOfBirth: '',
        gender: '',
        mobileNumber: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = useState<AlertColor>("error");
    const [loginMessage, setLoginMessage] = useState('Login')
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRegisterFormValues({
            ...registerFormValues,
            [name]: value
        })
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmPassword(e.target.value)
    }

    const doubleCheckPassword = () => {
        if (registerFormValues.password === confirmPassword)
            return true;

    }

    const emailValidation = () => {
        return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerFormValues.emailID))
    }

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        let formErrors = {
            fullName: "",
            emailID: '',
            dateOfBirth: '',
            gender: '',
            mobileNumber: '',
            password: ''
        }

        if (!registerFormValues.fullName.trim()) {
            valid = false;
            formErrors.fullName = "Full Name is required"
        }
        if (!registerFormValues.emailID.trim()) {
            valid = false;
            formErrors.emailID = "Email Id is required"
        } else if (emailValidation()) {
            valid = false;
            formErrors.emailID = "Invalid Email ID"
        }
        if (!registerFormValues.dateOfBirth.trim()) {
            valid = false;
            formErrors.dateOfBirth = "Date of Birth is required"
        }
        if (!registerFormValues.gender.trim()) {
            valid = false;
            formErrors.gender = "Gender is required"
        }
        if (!registerFormValues.mobileNumber.trim()) {
            valid = false;
            formErrors.mobileNumber = "Mobile Number is required"
        }
        if (!registerFormValues.password.trim()) {
            valid = false;
            formErrors.password = "Password is required"
        } else if (!doubleCheckPassword()) {
            valid = false;
            formErrors.password = "Passwords doesn't match"
        }

        setError(formErrors)

        if (valid) {
            //To do send the formdata to register the user
            try {
                registerUser(registerFormValues).then((response) => {
                    if(response.status === 201)
                    {
                        setOpen(true);
                        setSeverity('success');
                        setLoginMessage("Regstered Successfully! Please Login Now!");
                        setLoading(true);
                        setTimeout(() => {
                            router('/login'); // Redirect to the home page
                          }, 2000);
                    } else if(response.status === 400) {
                        setOpen(true);
                        setSeverity('warning');
                        setLoginMessage("Invalid fields");
                    }
                });
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch(error) {
                setOpen(true);
                        setSeverity('error');
                        setLoginMessage("Registration Failed! Plase try again");
                        setRegisterFormValues(initialValues);
            } finally {
                setLoading(false);
            }
        }
        console.log("error ", error)

    }
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
            marginTop: "5%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '40%',
        }}>
            <Typography component="h1">
                Register your Account
            </Typography>
            <Box component="form" onSubmit={register} noValidate>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="fullName"
                        label="Enter your Full Name"
                        name="fullName"
                        onChange={handleInputChange}
                        error={!!error.fullName}
                        helperText={error.fullName}
                        value={registerFormValues.fullName}
                        autoFocus />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Enter your Email ID"
                        name="emailID"
                        type="email"
                        onChange={handleInputChange}
                        error={!!error.emailID}
                        helperText={error.emailID}
                        value={registerFormValues.emailID}
                        autoFocus />
                </Box>
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    id="mobileNumber"
                    label="Enter your Mobile Number"
                    name="mobileNumber"
                    type="text"
                    onChange={handleInputChange}
                    error={!!error.mobileNumber}
                    helperText={error.mobileNumber}
                    value={registerFormValues.mobileNumber}
                    autoFocus />
                <InputLabel>Date of Birth</InputLabel>
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    onChange={handleInputChange}
                    error={!!error.dateOfBirth}
                    helperText={error.dateOfBirth}
                    autoFocus />
                <InputLabel>Gender</InputLabel>
                <RadioGroup defaultValue="female" name="gender" onChange={handleInputChange}>

                    <Radio value="female" label="Female" />
                    <Radio value="male" label="Male" />
                    <Radio value="other" label="Other" />
                </RadioGroup>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                    <TextField
                        required
                        fullWidth
                        type='password'
                        margin="normal"
                        id="password"
                        label="Enter your Password"
                        name="password"
                        error={!!error.password}
                        helperText={error.password}
                        onChange={handleInputChange}
                        autoFocus />
                    <TextField
                        required
                        fullWidth
                        type='password'
                        margin="normal"
                        id="confirmPassword"
                        label="Re-enter your Password"
                        name="confirmPassword"
                        onChange={handleConfirmPasswordChange}
                        autoFocus />
                </Box>
                <Box sx={{textAlign: 'center'}}>
                <Button type="submit" variant='contained' >Register</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                <span>Already a existing user? </span>
                <a href="/login">Login</a>
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


export default Register
