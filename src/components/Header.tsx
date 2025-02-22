import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Paper, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from '@mui/icons-material/Home';
import logo from "../assets/logo-cafe.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const USER_API = "https://waffle-production.up.railway.app/users";

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem("userEmail");
            if (!email) return;

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${USER_API}/${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.adm === 1) {
                    setIsAdmin(true);
                    localStorage.setItem("adm", "1");
                } else {
                    setIsAdmin(false);
                    localStorage.removeItem("adm");
                }
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                setIsAdmin(false);
            }
        };

        fetchUser();
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("adm");
        navigate("/");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="The News" width={40} style={{ borderRadius: "10px", marginRight: 8 }} />
                    <Typography variant="h6" sx={{ color: "black" }}>
                        the news
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#FFCE04",
                            color: "black",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#e6b800" },
                        }}
                    >
                        Subscribe
                    </Button>

                    <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                borderRadius: 2,
                                padding: 1,
                                backgroundColor: "white",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            },
                        }}
                    >
                        <Paper sx={{ padding: 2 }}>
                            <MenuItem onClick={() => navigate("/home")} sx={{ color: "black" }}>
                                <HomeIcon sx={{ marginRight: 1 }} />
                                Página Inicial
                            </MenuItem>

                            <MenuItem onClick={() => window.open("https://thenewscc.beehiiv.com/", "_blank")} sx={{ color: "black" }}>
                                <EmailIcon sx={{ marginRight: 1 }} />
                                Newsletter
                            </MenuItem>

                            {isAdmin && (
                                <MenuItem onClick={() => navigate("/dashboard")} sx={{ color: "black" }}>
                                    <DashboardIcon sx={{ marginRight: 1 }} />
                                    Dashboard
                                </MenuItem>
                            )}

                            <Divider sx={{ my: 1 }} />

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderColor: "black",
                                    color: "black",
                                    textTransform: "none",
                                    mb: 1,
                                    "&:hover": { backgroundColor: "#f5f5f5" },
                                }}
                                onClick={handleLogout}
                            >
                                <LogoutIcon sx={{ marginRight: 1 }} />
                                Fazer logout
                            </Button>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "#FFCE04",
                                    color: "black",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    "&:hover": { backgroundColor: "#e6b800" },
                                }}
                            >
                                Subscribe
                            </Button>
                        </Paper>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
