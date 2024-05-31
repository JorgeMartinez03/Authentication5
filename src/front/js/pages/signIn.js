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
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realiza el inicio de sesión
            const response = await actions.signIn(email, password);

            console.log("esta es la responseeeeeeeeeeeee",response)
            
            // Si el inicio de sesión es exitoso, navega a la vista privada ("/home")
            if (response) {
                navigate("/profile");
            } else {
                // Si hay algún error, puedes manejarlo aquí
                toast.error('Invalid email or password');
            }
            
            // Limpia los campos de email y contraseña después de iniciar sesión
            setEmail('');
            setPassword('');

        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    // Función para alternar entre mostrar u ocultar la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPasswordClick = () => {
        setShowModal(true); // Abrir el modal cuando se hace clic en el enlace "Forgot password?"
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar el modal
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
                            Sign In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, alignItems: 'center' }}>
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
                                        <Button onClick={togglePasswordVisibility} className="p" sx={{ color: '#FC6E51' }}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </Button>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#FC6E51', '&:hover': { backgroundColor: '#ff6600' } }}  
                            >
                                Sign In
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
                                <Grid item>
                                    <Link href="/signup" variant="body2" sx={{ color: '#FC6E51', '&:hover': { color: '#ff6600' } }}> 
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignIn;