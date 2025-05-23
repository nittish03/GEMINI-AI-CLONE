import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Media query for responsiveness
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // State hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loggedIn = false; // Adjust to the actual logged-in state

  // Redirect if already logged in
  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);

  // Toggle password visibility
  const showP = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = document.getElementById("cb").checked ? "text" : "password";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    const loading = toast.loading("Registering...");
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, { username, email, password });
      toast.dismiss(loading);
      toast.success("User Registered Successfully");
      navigate("/"); // Redirect to login page after successful registration
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Error Registering", err);
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={Boolean(error)}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" className="register-header">Sign Up</Typography>

        <TextField
          label="Username"
          required
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          required
          id="password"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div id="checkbox" className="form-check mb-3">
          <input onClick={showP} id="cb" type="checkbox" className="form-check-input" />
          <label className="form-check-label" htmlFor="cb">
            Show password
          </label>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Sign Up
        </Button>

        <Typography mt={2}>
          Already have an account? <Link to="/">Please Login</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Register;
