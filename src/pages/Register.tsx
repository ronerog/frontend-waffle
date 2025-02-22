import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Container } from "@mui/material";
import logo from "../assets/logo-cafe.png";

import axios from "axios";
import React from "react";
import Footer from "../components/Footer";
import HeaderAuth from "../components/DefaultHeader";

const API_URL = "https://waffle-production.up.railway.app";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await axios.post(`${API_URL}/register`, { email, password });
            setSuccess("Cadastro realizado com sucesso! Faça login.");
        } catch (err) {
            setError("Erro ao cadastrar. Tente um e-mail diferente.");
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
                        cadastre sua conta para verificar seus streaks de leitura
                    </Typography>
                </Box>

                <Container maxWidth="sm">
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            padding: 4,
                            background: "#FFCE04",
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#240E0B", textAlign: "center" }}>
                            criar conta
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#615A5A", mb: 3, textAlign: "center" }}>
                            insira seu e-mail e senha para se cadastrar
                        </Typography>

                        {error && <Typography color="error">{error}</Typography>}
                        {success && <Typography color="success.main">{success}</Typography>}

                        <form onSubmit={handleRegister}>
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
                                cadastrar
                            </Button>
                        </form>

                        <Typography variant="body2" sx={{ color: "#615A5A", mt: 2, textAlign: "center" }}>
                            já tem uma conta?{" "}
                            <a href="/" style={{ color: "#240E0B", fontWeight: "bold", textDecoration: "none" }}>
                                faça login
                            </a>
                        </Typography>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Register;
