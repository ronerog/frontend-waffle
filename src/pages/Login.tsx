import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import logo from "../assets/logo-cafe.png"
import HeaderAuth from "../components/headerAuth";
import Footer from "../components/Footer";
const API_URL = "https://waffle-production.up.railway.app";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", email)
            window.location.href = "/home";
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <>
            <HeaderAuth />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFF",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <img src={logo} alt="The News Logo" width={90} style={{ borderRadius: '10px' }} />
                    <Typography variant="h4" sx={{ fontWeight: "bolder", color: "#240E0B", mt: 1, textShadow: "0.5px 0.5px 1.5px white" }}>
                        verifique seus streaks de leitura
                    </Typography>
                </Box>

                <Container maxWidth="sm">
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            padding: 4,
                            backgroundColor: "#FFCE04"
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bolder", color: "#240E0B", textAlign: "center" }}>
                            bem-vindo!
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#615A5A", mb: 3, textAlign: "center" }}>
                            faça login para continuar
                        </Typography>

                        {error && <Typography color="error">{error}</Typography>}

                        <form onSubmit={handleLogin}>
                            <TextField
                                label="e-mail"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "white",
                                    },
                                }}
                            />

                            <TextField
                                label="senha"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "white",
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    backgroundColor: "#000000",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#240E0B" },
                                }}
                            >
                                entrar
                            </Button>
                        </form>

                        <Typography variant="body2" sx={{ color: "#615A5A", mt: 2, textAlign: "center" }}>
                            não tem uma conta?{" "}
                            <a href="/register" style={{ color: "#240E0B", fontWeight: "bold", textDecoration: "none" }}>
                                cadastre-se
                            </a>
                        </Typography>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Login;
