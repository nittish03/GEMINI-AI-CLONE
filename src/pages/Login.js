import React, { useEffect, useState } from "react";
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

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = true;
    if (loggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  // Toggle password visibility
  const showPassword = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = document.getElementById("cb").checked
      ? "text"
      : "password";
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Logging in");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("authToken", true);
      localStorage.setItem("username", response.data.username);
      
      toast.dismiss(loading);
      toast.success(`Logged in as ${response.data.username}`);
      navigate("/home");
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Error logging in");
      console.log(err);

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
    <Box className="login-container">
      <Collapse in={Boolean(error)}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <Typography variant="h3" className="login-header">
          Sign In
        </Typography>

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
          id="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-check mb-3">
          <input
            onClick={showPassword}
            id="cb"
            type="checkbox"
            className="form-check-input"
          />
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
          Sign In
        </Button>

        <Typography mt={2}>
          Don't have an account? <Link to="/register">Please Register</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
