import React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <Box className="navbar">
      <Typography variant="h4" className="navbar-logo">
        Gemini AI
      </Typography>
      <nav className="navbar-links">
        <NavLink to="/home" className="nav-link">
          Home
        </NavLink>
        {loggedIn && (
          <Button onClick={handleLogout} className="logout-btn">
            Logout
          </Button>
        )}
      </nav>
    </Box>
  );
};

export default Navbar;
