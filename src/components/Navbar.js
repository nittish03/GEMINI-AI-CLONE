import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { styled, keyframes } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
  50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  25% { opacity: 0.7; transform: scale(1.1) rotate(90deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  75% { opacity: 0.8; transform: scale(0.9) rotate(270deg); }
`;

// Styled components
const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  background: `linear-gradient(-45deg, 
    rgba(15, 23, 42, 0.95), 
    rgba(30, 41, 59, 0.95), 
    rgba(51, 65, 85, 0.95), 
    rgba(30, 41, 59, 0.95)
  )`,
  backgroundSize: "400% 400%",
  animation: `${gradientShift} 15s ease infinite`,
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, 
      transparent 30%, 
      rgba(147, 51, 234, 0.05) 50%, 
      transparent 70%
    )`,
    animation: `${gradientShift} 20s ease infinite`,
    pointerEvents: "none",
  },
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&:hover": {
    transform: "scale(1.05)",
    animation: `${float} 2s ease-in-out infinite`,
  },
});

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 800,
  background: `linear-gradient(135deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%
  )`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "300% 300%",
  animation: `${gradientShift} 8s ease infinite`,
  textShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
  fontFamily: "'Inter', 'Roboto', sans-serif",
  letterSpacing: "-0.02em",
  position: "relative",
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    animation: `${glow} 3s ease-in-out infinite`,
    zIndex: -1,
  },
}));

const LogoIcon = styled(AutoAwesomeIcon)({
  fontSize: "2rem",
  color: "#f093fb",
  animation: `${sparkle} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 10px rgba(240, 147, 251, 0.5))",
});

const NavLinksContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  position: "relative",
  color: "#e2e8f0",
  textDecoration: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "1rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(147, 51, 234, 0.3), 
      rgba(79, 172, 254, 0.3)
    )`,
    borderRadius: "inherit",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  
  "&:hover": {
    transform: "translateY(-2px)",
    color: "#ffffff",
    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)",
    
    "&::before": {
      opacity: 1,
    },
  },
  
  "&.active": {
    background: `linear-gradient(135deg, 
      rgba(147, 51, 234, 0.2), 
      rgba(79, 172, 254, 0.2)
    )`,
    color: "#ffffff",
    boxShadow: "0 5px 15px rgba(147, 51, 234, 0.4)",
    
    "&::before": {
      opacity: 0.7,
    },
  },
  
  "& .MuiSvgIcon-root": {
    transition: "transform 0.3s ease",
  },
  
  "&:hover .MuiSvgIcon-root": {
    transform: "scale(1.1)",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    rgba(239, 68, 68, 0.8), 
    rgba(220, 38, 127, 0.8)
  )`,
  color: "white",
  padding: "0.75rem 1.5rem",
  borderRadius: "12px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
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
    transition: "left 0.5s ease",
  },
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
    background: `linear-gradient(135deg, 
      rgba(239, 68, 68, 1), 
      rgba(220, 38, 127, 1)
    )`,
    
    "&::before": {
      left: "100%",
    },
    
    "& .MuiSvgIcon-root": {
      transform: "rotate(10deg) scale(1.1)",
    },
  },
  
  "& .MuiSvgIcon-root": {
    marginRight: "0.5rem",
    transition: "transform 0.3s ease",
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully", {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed", {
        style: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
        },
      });
    }
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <NavbarContainer 
      sx={{
        transform: scrolled ? "translateY(-2px)" : "translateY(0)",
        boxShadow: scrolled 
          ? "0 20px 40px rgba(0, 0, 0, 0.15)" 
          : "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LogoContainer onClick={handleLogoClick}>
        <LogoIcon />
        <LogoText variant="h4">
          Gemini AI
        </LogoText>
      </LogoContainer>
      
      <NavLinksContainer>
        <StyledNavLink 
          to="/home" 
          className={location.pathname === "/home" ? "active" : ""}
        >
          <HomeIcon />
          Home
        </StyledNavLink>
        
        {loggedIn && (
          <LogoutButton onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </LogoutButton>
        )}
      </NavLinksContainer>
    </NavbarContainer>
  );
};

export default Navbar;
