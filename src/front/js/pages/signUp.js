import React, { useState, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const notify = () => toast("User has been created!", {
        onClose: () => navigate("/login")
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await actions.signUp(name, email, password);
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Grid container component="main" sx={{ height: '100vh', backgroundImage: 'url("https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                        mx: 'auto', 
                        height: '100%',
                        minHeight: '100vh', 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    }}
                >
                    <Box
                        sx={{
                            my: "20vh",
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                        <Typography component="h1" variant="h5" sx={{ color: "#FC6E51" }}>
                            SIGN UP
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, alignItems: 'center' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused': { borderColor: '#FC6E51' },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    sx: {
                                        '&.Mui-focused': { borderColor: '#FC6E51' },
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <Button onClick={togglePasswordVisibility} sx={{ color: '#FC6E51' }}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </Button>
                                    ),
                                    sx: {
                                        '&.Mui-focused': { borderColor: '#FC6E51' },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#FC6E51', '&:hover': { backgroundColor: '#ff6600' } }}
                                onClick={notify}
                            >
                                Sign Up
                            </Button>
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" sx={{ color: '#FC6E51', '&:hover': { color: '#ff6600' } }}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link href="/login" variant="body2" sx={{ color: '#FC6E51', '&:hover': { color: '#ff6600' } }}>
                                        Already have account? Sign IN
                                    </Link>
                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignUp;