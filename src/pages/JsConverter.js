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
  Chip,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import JavaScriptIcon from "@mui/icons-material/Javascript";
import DownloadIcon from "@mui/icons-material/Download";

// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const codeFlow = keyframes`
  0% { transform: translateY(0px); opacity: 0.3; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
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

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  25% { opacity: 0.7; transform: scale(1.2) rotate(90deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  75% { opacity: 0.8; transform: scale(0.8) rotate(270deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled components
const ConverterContainer = styled(Box)(({ theme }) => ({
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
      radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  
  // Floating code symbols
  "&::after": {
    content: '"{ } < /> [ ] ( )"',
    position: "absolute",
    top: "10%",
    right: "10%",
    fontSize: "1.5rem",
    color: "rgba(245, 158, 11, 0.1)",
    fontFamily: "'Fira Code', monospace",
    animation: `${codeFlow} 6s ease-in-out infinite`,
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
      rgba(245, 158, 11, 0.03), 
      rgba(34, 197, 94, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 35px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
  },
}));

const ConverterHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  position: "relative",
});

const HeaderIcon = styled(JavaScriptIcon)({
  fontSize: "2.5rem",
  color: "#f59e0b",
  animation: `${sparkle} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 15px rgba(245, 158, 11, 0.5))",
});

const HeaderText = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 800,
  background: `linear-gradient(135deg, 
    #f59e0b 0%, 
    #eab308 25%, 
    #22c55e 50%, 
    #3b82f6 100%
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
    fontFamily: "'Inter', sans-serif",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(245, 158, 11, 0.3)",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(245, 158, 11, 0.1)",
    },
    
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(245, 158, 11, 0.5)",
      boxShadow: "0 0 30px rgba(245, 158, 11, 0.2)",
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
      color: "#f59e0b",
    },
  },
  
  "& .MuiOutlinedInput-input": {
    "&::placeholder": {
      color: "#64748b",
      opacity: 1,
    },
  },
}));

const ConvertButton = styled(Button)(({ theme, isLoading }) => ({
  background: `linear-gradient(135deg, 
    rgba(245, 158, 11, 0.9), 
    rgba(34, 197, 94, 0.9)
  )`,
  borderRadius: "16px",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  color: "white",
  border: "1px solid rgba(245, 158, 11, 0.3)",
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
    boxShadow: "0 15px 35px rgba(245, 158, 11, 0.4)",
    background: `linear-gradient(135deg, 
      rgba(245, 158, 11, 1), 
      rgba(34, 197, 94, 1)
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

const CodeCard = styled(Card)(({ theme, hasCode }) => ({
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(20px)",
  border: hasCode ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
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
    background: hasCode ? `linear-gradient(135deg, 
      rgba(34, 197, 94, 0.05), 
      rgba(59, 130, 246, 0.05)
    )` : `linear-gradient(135deg, 
      rgba(100, 116, 139, 0.03), 
      rgba(71, 85, 105, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  ...(hasCode && {
    boxShadow: "0 25px 50px rgba(34, 197, 94, 0.1)",
    
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 35px 60px rgba(34, 197, 94, 0.15)",
    },
  }),
}));

const CodeHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.5rem 1.5rem 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "1rem",
});

const CodeLanguageChip = styled(Chip)({
  background: `linear-gradient(135deg, 
    rgba(245, 158, 11, 0.2), 
    rgba(34, 197, 94, 0.2)
  )`,
  color: "#22c55e",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  fontWeight: 600,
  
  "& .MuiChip-icon": {
    color: "#f59e0b",
  },
});

const CodeContent = styled(Box)(({ isTyping }) => ({
  fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: "#e2e8f0",
  padding: "1.5rem",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  background: "rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  margin: "0 1.5rem 1.5rem",
  position: "relative",
  overflow: "auto",
  maxHeight: "400px",
  
  // Syntax highlighting colors
  "& .keyword": { color: "#ff79c6" },
  "& .string": { color: "#f1fa8c" },
  "& .comment": { color: "#6272a4" },
  "& .number": { color: "#bd93f9" },
  "& .function": { color: "#50fa7b" },
  
  ...(isTyping && {
    "&::after": {
      content: "'█'",
      animation: `${pulse} 1s ease-in-out infinite`,
      color: "#22c55e",
    },
  }),
  
  // Custom scrollbar
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(34, 197, 94, 0.5)",
    borderRadius: "4px",
    
    "&:hover": {
      background: "rgba(34, 197, 94, 0.7)",
    },
  },
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
    background: "rgba(34, 197, 94, 0.2)",
    color: "#22c55e",
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
    color: "#f59e0b",
  },
});

const JsConverter = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = true;

  // states
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Simple syntax highlighter
  const highlightSyntax = (code) => {
    return code
      .replace(/(function|const|let|var|if|else|for|while|return|class|import|export)/g, '<span class="keyword">$1</span>')
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="string">$1$2$3</span>')
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError("");
      
      const loadingToast = toast.loading("🔧 Generating JavaScript code...", {
        style: {
          background: 'linear-gradient(135deg, #f59e0b 0%, #22c55e 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: {
          contents: [
            { parts: [{ text: `Convert these instructions into clean, well-commented JavaScript code with modern ES6+ syntax: ${text}` }] },
          ],
        },
      });

      toast.dismiss(loadingToast);
      toast.success("✨ Code generated successfully!", {
        style: {
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const generatedCode = response.data.candidates[0].content.parts[0].text;
      
      // Typing animation
      setIsTyping(true);
      setCode("");
      
      // Simulate typing effect
      for (let i = 0; i <= generatedCode.length; i++) {
        setTimeout(() => {
          setCode(generatedCode.slice(0, i));
          if (i === generatedCode.length) setIsTyping(false);
        }, i * 10);
      }
      
      // Clear input
      setText("");
      
    } catch (err) {
      console.error(err);
      toast.dismiss();
      setError("Error occurred while generating code.");
      toast.error("Failed to generate code", {
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!", {
      style: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = "generated-code.js";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Code downloaded successfully!", {
      style: {
        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });
  };

  const handleClearCode = () => {
    setCode("");
    setIsTyping(false);
  };

  if (!loggedIn) {
    return (
      <ConverterContainer>
        <LoginMessage>
          🔐 LOG IN TO ACCESS
        </LoginMessage>
      </ConverterContainer>
    );
  }

  return (
    <ConverterContainer>
      <MainContent>
        {/* Input Form */}
        <FormCard>
          <ConverterHeader>
            <HeaderIcon />
            <HeaderText>
              JS Converter
            </HeaderText>
          </ConverterHeader>

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
              placeholder="Describe what you want to code... e.g., 'Create a function that sorts an array' ⚡"
              multiline
              rows={4}
              required
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 3 }}
            />

            <ConvertButton
              type="submit"
              fullWidth
              disabled={isLoading || !text.trim()}
              isLoading={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Converting...
                </>
              ) : (
                <>
                  Convert to Code
                  <AutoFixHighIcon />
                </>
              )}
            </ConvertButton>

            <BackLink to="/">
              ← Back to Home
            </BackLink>
          </form>
        </FormCard>

        {/* Code Output Card */}
        <Slide direction="up" in={true} timeout={800}>
          <CodeCard hasCode={!!code}>
            {code ? (
              <>
                <CodeHeader>
                  <CodeLanguageChip
                    icon={<JavaScriptIcon />}
                    label="JavaScript ES6+"
                    variant="outlined"
                  />
                  
                  <Box>
                    <ActionButton onClick={handleCopyCode} title="Copy Code">
                      <ContentCopyIcon />
                    </ActionButton>
                    <ActionButton onClick={handleDownloadCode} title="Download" sx={{ ml: 1 }}>
                      <DownloadIcon />
                    </ActionButton>
                    <ActionButton onClick={handleClearCode} title="Clear" sx={{ ml: 1 }}>
                      <ClearIcon />
                    </ActionButton>
                  </Box>
                </CodeHeader>
                
                <CodeContent
                  isTyping={isTyping}
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }}
                />
              </>
            ) : (
              <PlaceholderContent>
                <CodeIcon />
                <Typography variant="h5" color="inherit" textAlign="center">
                  Your JavaScript Code Will Appear Here
                </Typography>
                <Typography color="inherit" textAlign="center" sx={{ mt: 1, opacity: 0.7 }}>
                  Describe your requirements and I'll generate the code! ⚡
                </Typography>
              </PlaceholderContent>
            )}
          </CodeCard>
        </Slide>
      </MainContent>
    </ConverterContainer>
  );
};

export default JsConverter;
