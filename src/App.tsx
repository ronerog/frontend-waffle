import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated } from "./hooks/useAuth";
import { JSX } from "react";
import React from "react";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;