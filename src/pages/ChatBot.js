import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Card,
  IconButton,
  Fade,
  Slide,
  CircularProgress,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person"; // ✅ Correct import
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";


// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const typing = keyframes`
  0% { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  25% { opacity: 0.7; transform: scale(1.2) rotate(90deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  75% { opacity: 0.8; transform: scale(0.8) rotate(270deg); }
`;

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(-45deg, 
    #0f172a, 
    #1e293b, 
    #334155, 
    #1e293b
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
      radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
}));

const MainContent = styled(Box)({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
  alignItems: "start",
  animation: `${slideUp} 0.8s ease-out`,
  
  "@media (max-width: 1000px)": {
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
  },
});

const LoginMessage = styled(Typography)({
  textAlign: "center",
  fontSize: "3rem",
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
  animation: `${gradientShift} 8s ease infinite, ${float} 3s ease-in-out infinite`,
  marginTop: "20vh",
  textShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
});

const FormCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "2rem",
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(147, 51, 234, 0.03), 
      rgba(79, 172, 254, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 35px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(147, 51, 234, 0.3)",
  },
}));

const ChatHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  position: "relative",
});

const HeaderIcon = styled(AutoAwesomeIcon)({
  fontSize: "2.5rem",
  color: "#f093fb",
  animation: `${sparkle} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 15px rgba(240, 147, 251, 0.5))",
});

const HeaderText = styled(Typography)({
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
  fontFamily: "'Inter', 'Roboto', sans-serif",
  letterSpacing: "-0.02em",
});

const StyledTextField = styled(TextField)(({ theme, isLoading }) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    fontSize: "1.1rem",
    color: "#e2e8f0",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: "120px",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.1)",
    },
    
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(147, 51, 234, 0.5)",
      boxShadow: "0 0 30px rgba(147, 51, 234, 0.2)",
      transform: "translateY(-2px)",
    },
    
    "&.Mui-disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
  
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    "&.Mui-focused": {
      color: "#f093fb",
    },
  },
  
  "& .MuiOutlinedInput-input": {
    "&::placeholder": {
      color: "#64748b",
      opacity: 1,
    },
  },
  
  // Loading state animation
  ...(isLoading && {
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(90deg, 
        transparent, 
        rgba(147, 51, 234, 0.1), 
        transparent
      )`,
      animation: `${typing} 2s ease-in-out infinite`,
    },
  }),
}));

const SubmitButton = styled(Button)(({ theme, isLoading }) => ({
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
    
    "& .MuiSvgIcon-root": {
      transform: "translateX(5px)",
    },
  },
  
  "&:disabled": {
    background: "rgba(100, 116, 139, 0.5)",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "not-allowed",
    
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
}));

const ResponseCard = styled(Card)(({ theme, hasResponse }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  minHeight: "500px",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: hasResponse ? `linear-gradient(135deg, 
      rgba(34, 197, 94, 0.05), 
      rgba(59, 130, 246, 0.05)
    )` : `linear-gradient(135deg, 
      rgba(100, 116, 139, 0.03), 
      rgba(71, 85, 105, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  ...(hasResponse && {
    border: "1px solid rgba(34, 197, 94, 0.2)",
    boxShadow: "0 25px 50px rgba(34, 197, 94, 0.1)",
    
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 35px 60px rgba(34, 197, 94, 0.15)",
    },
  }),
}));

const ResponseHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.5rem 1.5rem 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "1rem",
});

const BotAvatar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
    color: "#22c55e",
    animation: `${sparkle} 4s ease-in-out infinite`,
  },
});

const ResponseContent = styled(Typography)(({ isTyping }) => ({
  color: "#e2e8f0",
  fontSize: "1.1rem",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  padding: "1.5rem",
  position: "relative",
  
  ...(isTyping && {
    "&::after": {
      content: "'|'",
      animation: `${pulse} 1s ease-in-out infinite`,
      color: "#22c55e",
    },
  }),
}));

const PlaceholderContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "400px",
  color: "#64748b",
  
  "& .MuiSvgIcon-root": {
    fontSize: "4rem",
    marginBottom: "1rem",
    opacity: 0.5,
    animation: `${float} 3s ease-in-out infinite`,
  },
});

const ActionButton = styled(IconButton)({
  background: "rgba(255, 255, 255, 0.1)",
  color: "#e2e8f0",
  transition: "all 0.3s ease",
  
  "&:hover": {
    background: "rgba(147, 51, 234, 0.2)",
    color: "#f093fb",
    transform: "scale(1.1)",
  },
});

const BackLink = styled(Link)({
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  marginTop: "1rem",
  
  "&:hover": {
    color: "#f093fb",
  },
});

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = true;

  // states
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const responseRef = useRef(null);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError("");
      
      const loadingToast = toast.loading("🤖 AI is thinking...", {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const apiResponse = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: { contents: [{ parts: [{ text }] }] },
      });

      toast.dismiss(loadingToast);
      toast.success("✨ Response generated successfully!", {
        style: {
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const responseText = apiResponse.data.candidates[0].content.parts[0].text;
      
      // Typing animation
      setIsTyping(true);
      setResponse("");
      
      // Simulate typing effect
      for (let i = 0; i <= responseText.length; i++) {
        setTimeout(() => {
          setResponse(responseText.slice(0, i));
          if (i === responseText.length) setIsTyping(false);
        }, i * 20);
      }
      
      // Clear input
      setText("");
      
    } catch (err) {
      console.error(err);
      toast.dismiss();
      setError("Error occurred while generating response");
      toast.error("Failed to generate response", {
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

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!", {
      style: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });
  };

  const handleClearResponse = () => {
    setResponse("");
    setIsTyping(false);
  };

  if (!loggedIn) {
    return (
      <ChatContainer>
        <LoginMessage variant="h1">
          🔐 LOG IN TO ACCESS
        </LoginMessage>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <MainContent>
        {/* Input Form */}
        <FormCard>
          <ChatHeader>
            <HeaderIcon />
            <HeaderText>
              Ask Gemini AI
            </HeaderText>
          </ChatHeader>

          <Collapse in={!!error}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2, 
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
              placeholder="Ask me anything... ✨"
              multiline
              rows={4}
              required
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              isLoading={isLoading}
              sx={{ mb: 3 }}
            />

            <SubmitButton
              type="submit"
              fullWidth
              disabled={isLoading || !text.trim()}
              isLoading={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Processing...
                </>
              ) : (
                <>
                  Send Message
                  <SendIcon />
                </>
              )}
            </SubmitButton>

            <BackLink to="/">
              ← Back to Home
            </BackLink>
          </form>
        </FormCard>

        {/* Response Card */}
        <Slide direction="up" in={true} timeout={800}>
          <ResponseCard hasResponse={!!response}>
            {response ? (
              <>
                <ResponseHeader>
                  <BotAvatar>
                    <SmartToyIcon />
                    <Typography variant="h6" color="#22c55e" fontWeight={600}>
                      Gemini AI
                    </Typography>
                  </BotAvatar>
                  
                  <Box>
                    <ActionButton onClick={handleCopyResponse}>
                      <ContentCopyIcon />
                    </ActionButton>
                    <ActionButton onClick={handleClearResponse} sx={{ ml: 1 }}>
                      <ClearIcon />
                    </ActionButton>
                  </Box>
                </ResponseHeader>
                
                <ResponseContent ref={responseRef} isTyping={isTyping}>
                  {response}
                </ResponseContent>
              </>
            ) : (
              <PlaceholderContent>
                <SmartToyIcon />
                <Typography variant="h5" color="inherit" textAlign="center">
                  AI Response Will Appear Here
                </Typography>
                <Typography color="inherit" textAlign="center" sx={{ mt: 1, opacity: 0.7 }}>
                  Ask me anything and I'll help you! ✨
                </Typography>
              </PlaceholderContent>
            )}
          </ResponseCard>
        </Slide>
      </MainContent>
    </ChatContainer>
  );
};

export default ChatBot;
