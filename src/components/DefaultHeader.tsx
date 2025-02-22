import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import logo from "../assets/logo-cafe.png";

const HeaderAuth = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 64 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                        src={logo}
                        alt="The News"
                        width={50}
                        style={{ borderRadius: "10px", objectFit: "contain" }}
                    />
                    <Typography variant="h6" sx={{ color: "black", marginLeft: 1 }}>
                        the news
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderAuth;
