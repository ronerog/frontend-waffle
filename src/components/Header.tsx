import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Paper, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../assets/logo-cafe.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose
        localStorage.removeItem("userEmail");
        navigate("/");
      };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="The News" width={40} style={{ borderRadius: "10px", marginRight: 8 }} />
                    <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
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
                            <MenuItem onClick={handleMenuClose} sx={{ color: "black" }}>
                                <EmailIcon sx={{ marginRight: 1 }} />
                                Newsletters
                            </MenuItem>

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
