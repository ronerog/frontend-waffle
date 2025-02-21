import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { isAuthenticated } from "./hooks/useAuth";
import { JSX } from "react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

const theme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            '"Segoe UI"',
            'ui-sans-serif',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              fontFamily: [
                'Poppins',
                '"Segoe UI"',
                'ui-sans-serif',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ],
            },
          },
        },
      },
});

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;