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
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Card,
  Container,
  CircularProgress,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import SecurityIcon from "@mui/icons-material/Security";

// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  25% { opacity: 0.7; transform: scale(1.2) rotate(90deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  75% { opacity: 0.8; transform: scale(0.9) rotate(270deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
  50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.4); }
`;

const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
`;

// Styled components
const LoginContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(-45deg, 
    #0f172a, 
    #1e293b, 
    #334155, 
    #1e293b,
    #0f172a
  )`,
  backgroundSize: "400% 400%",
  animation: `${gradientShift} 20s ease infinite`,
  padding: "2rem",
  position: "relative",
  overflow: "hidden",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(79, 172, 254, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    `,
    pointerEvents: "none",
  },
});

const LoginCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "32px",
  padding: "3rem 2.5rem",
  maxWidth: "460px",
  width: "100%",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  animation: `${slideInUp} 0.8s ease-out, ${glow} 6s ease-in-out infinite`,
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(147, 51, 234, 0.03), 
      rgba(79, 172, 254, 0.03),
      rgba(236, 72, 153, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 35px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(147, 51, 234, 0.3)",
  },
  
  "@media (max-width: 600px)": {
    margin: "1rem",
    padding: "2.5rem 2rem",
  },
});

const WelcomeSection = styled(Box)({
  textAlign: "center",
  marginBottom: "2.5rem",
  position: "relative",
});

const WelcomeIcon = styled(WavingHandIcon)({
  fontSize: "3rem",
  color: "#f59e0b",
  marginBottom: "1rem",
  animation: `${wave} 2s ease-in-out infinite, ${float} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 15px rgba(245, 158, 11, 0.5))",
});

const LoginHeader = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 800,
  background: `linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #4facfe 100%
  )`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "300% 300%",
  animation: `${gradientShift} 8s ease infinite`,
  marginBottom: "0.5rem",
  fontFamily: "'Inter', 'Roboto', sans-serif",
  letterSpacing: "-0.02em",
});

const WelcomeSubtext = styled(Typography)({
  color: "#94a3b8",
  fontSize: "1.1rem",
  fontWeight: 400,
  marginBottom: "2rem",
});

const StyledTextField = styled(TextField)(({ error }) => ({
  marginBottom: "1.5rem",
  
  "& .MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    fontSize: "1rem",
    color: "#e2e8f0",
    border: `1px solid ${error ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      border: `1px solid ${error ? "rgba(239, 68, 68, 0.7)" : "rgba(147, 51, 234, 0.4)"}`,
      transform: "translateY(-2px)",
      boxShadow: `0 8px 25px ${error ? "rgba(239, 68, 68, 0.15)" : "rgba(147, 51, 234, 0.15)"}`,
    },
    
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.1)",
      border: `1px solid ${error ? "rgba(239, 68, 68, 0.8)" : "rgba(147, 51, 234, 0.6)"}`,
      boxShadow: `0 0 30px ${error ? "rgba(239, 68, 68, 0.3)" : "rgba(147, 51, 234, 0.3)"}`,
      transform: "translateY(-2px)",
    },
  },
  
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    "&.Mui-focused": {
      color: error ? "#ef4444" : "#9333ea",
    },
  },
  
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: error ? "#ef4444" : "#64748b",
    transition: "color 0.3s ease",
  },
}));

const PasswordToggle = styled(IconButton)({
  color: "#64748b",
  transition: "all 0.3s ease",
  
  "&:hover": {
    color: "#9333ea",
    background: "rgba(147, 51, 234, 0.1)",
    transform: "scale(1.1)",
  },
});

const StyledCheckbox = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    color: "#94a3b8",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  
  "& .MuiCheckbox-root": {
    color: "#64748b",
    
    "&.Mui-checked": {
      color: "#9333ea",
    },
    
    "&:hover": {
      background: "rgba(147, 51, 234, 0.1)",
    },
  },
});

const LoginButton = styled(Button)(({ isLoading }) => ({
  background: `linear-gradient(135deg, 
    rgba(147, 51, 234, 0.9), 
    rgba(79, 172, 254, 0.9)
  )`,
  borderRadius: "16px",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  color: "white",
  border: "1px solid rgba(147, 51, 234, 0.3)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: "1rem",
  marginBottom: "2rem",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    )`,
    transition: "left 0.6s ease",
  },
  
  "&:hover:not(:disabled)": {
    transform: "translateY(-3px)",
    boxShadow: "0 15px 35px rgba(147, 51, 234, 0.4)",
    background: `linear-gradient(135deg, 
      rgba(147, 51, 234, 1), 
      rgba(79, 172, 254, 1)
    )`,
    
    "&::before": {
      left: "100%",
    },
  },
  
  "&:disabled": {
    background: "rgba(100, 116, 139, 0.5)",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "not-allowed",
    transform: "none",
    
    ...(isLoading && {
      "& .MuiCircularProgress-root": {
        animation: `${pulse} 1.5s ease-in-out infinite`,
      },
    }),
  },
  
  "& .MuiSvgIcon-root": {
    marginLeft: "0.5rem",
    transition: "transform 0.3s ease",
  },
  
  "&:hover .MuiSvgIcon-root": {
    transform: "translateX(3px)",
  },
}));

const RegisterLink = styled(Box)({
  textAlign: "center",
  
  "& .register-text": {
    color: "#94a3b8",
    fontSize: "0.95rem",
  },
  
  "& a": {
    color: "#9333ea",
    textDecoration: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
    position: "relative",
    
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: 0,
      width: 0,
      height: "2px",
      background: `linear-gradient(135deg, #9333ea, #3b82f6)`,
      transition: "width 0.3s ease",
    },
    
    "&:hover": {
      color: "#7c3aed",
      
      "&::after": {
        width: "100%",
      },
    },
  },
});

const SecurityBadge = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  marginTop: "1.5rem",
  padding: "0.75rem 1rem",
  background: "rgba(34, 197, 94, 0.1)",
  border: "1px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  color: "#22c55e",
  fontSize: "0.85rem",
  fontWeight: 500,
  
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
    animation: `${sparkle} 3s ease-in-out infinite`,
  },
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("authToken");
    if (loggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const loadingToast = toast.loading("🔐 Signing you in...", {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        { email, password }
      );

      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      localStorage.setItem("username", response.data.username);
      
      toast.dismiss(loadingToast);
      toast.success(`✨ Welcome back, ${response.data.username}!`, {
        style: {
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });
      
      navigate("/home");
    } catch (err) {
      toast.dismiss(loadingToast);
      
      const errorMessage = err.response?.data?.error || err.message || "Login failed";
      setError(errorMessage);
      
      toast.error("❌ " + errorMessage, {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <LoginCard>
          <WelcomeSection>
            <WelcomeIcon />
            <LoginHeader>
              Welcome Back
            </LoginHeader>
            <WelcomeSubtext>
              Sign in to access your AI-powered tools
            </WelcomeSubtext>
          </WelcomeSection>

          <Collapse in={Boolean(error)}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#fca5a5',
              }}
            >
              {error}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              error={error && error.toLowerCase().includes('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              error={error && error.toLowerCase().includes('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <PasswordToggle
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </PasswordToggle>
                  </InputAdornment>
                ),
              }}
            />

            <StyledCheckbox
              control={
                <Checkbox 
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  disabled={isLoading}
                />
              }
              label="Show password"
            />

            <LoginButton
              type="submit"
              fullWidth
              disabled={isLoading || !email || !password}
              isLoading={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <LoginIcon />
                </>
              )}
            </LoginButton>

            <RegisterLink>
              <Typography className="register-text">
                Don't have an account?{" "}
                <Link to="/register">Create Account</Link>
              </Typography>
            </RegisterLink>

            <SecurityBadge>
              <SecurityIcon />
              <span>Secured with end-to-end encryption</span>
            </SecurityBadge>
          </form>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};

export default Login;
