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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from "@mui/icons-material/Download";
import SpeedIcon from "@mui/icons-material/Speed";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CompressIcon from "@mui/icons-material/Compress";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const compressAnimation = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(0.95) rotate(2deg); }
  50% { transform: scale(1.05) rotate(-1deg); }
  75% { transform: scale(0.98) rotate(1deg); }
  100% { transform: scale(1) rotate(0deg); }
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

const textFlow = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0px); }
`;

const waveText = keyframes`
  0%, 100% { transform: translateY(0px); }
  25% { transform: translateY(-5px); }
  50% { transform: translateY(0px); }
  75% { transform: translateY(-3px); }
`;

// Styled components
const SummaryContainer = styled(Box)(({ theme }) => ({
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
      radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  
  // Floating text elements
  "&::after": {
    content: '"📝 ✂️ 📄 ⚡"',
    position: "absolute",
    top: "12%",
    right: "10%",
    fontSize: "2rem",
    opacity: 0.1,
    animation: `${float} 6s ease-in-out infinite`,
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
      rgba(34, 197, 94, 0.03), 
      rgba(59, 130, 246, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 35px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
  },
}));

const FormHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  position: "relative",
});

const HeaderIcon = styled(CompressIcon)({
  fontSize: "2.5rem",
  color: "#22c55e",
  animation: `${compressAnimation} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 15px rgba(34, 197, 94, 0.5))",
});

const HeaderText = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 800,
  background: `linear-gradient(135deg, 
    #22c55e 0%, 
    #16a34a 25%, 
    #3b82f6 50%, 
    #1d4ed8 100%
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
    minHeight: "140px",
    
    "&:hover": {
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(34, 197, 94, 0.3)",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(34, 197, 94, 0.1)",
    },
    
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(34, 197, 94, 0.5)",
      boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
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
      color: "#22c55e",
    },
  },
  
  "& .MuiOutlinedInput-input": {
    "&::placeholder": {
      color: "#64748b",
      opacity: 1,
    },
  },
}));

const OptionsSection = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
  marginBottom: "1rem",
  
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

const StyledSelect = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    color: "#e2e8f0",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    
    "&:hover": {
      border: "1px solid rgba(34, 197, 94, 0.3)",
    },
    
    "&.Mui-focused": {
      border: "1px solid rgba(34, 197, 94, 0.5)",
    },
  },
  
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    "&.Mui-focused": {
      color: "#22c55e",
    },
  },
  
  "& .MuiSvgIcon-root": {
    color: "#94a3b8",
  },
});

const LengthSliderBox = styled(Box)({
  padding: "1rem",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "1rem",
});

const StyledSlider = styled(Slider)({
  color: "#22c55e",
  
  "& .MuiSlider-track": {
    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
  },
  
  "& .MuiSlider-thumb": {
    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
    boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
  },
  
  "& .MuiSlider-rail": {
    background: "rgba(255, 255, 255, 0.1)",
  },
});

const SummarizeButton = styled(Button)(({ theme, isLoading }) => ({
  background: `linear-gradient(135deg, 
    rgba(34, 197, 94, 0.9), 
    rgba(59, 130, 246, 0.9)
  )`,
  borderRadius: "16px",
  padding: "1rem 2rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  color: "white",
  border: "1px solid rgba(34, 197, 94, 0.3)",
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
    boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)",
    background: `linear-gradient(135deg, 
      rgba(34, 197, 94, 1), 
      rgba(59, 130, 246, 1)
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
  },
  
  "& .MuiSvgIcon-root": {
    marginLeft: "0.5rem",
    transition: "transform 0.3s ease",
  },
}));

const SummaryCard = styled(Card)(({ theme, hasSummary }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(20px)",
  border: hasSummary ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
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
    background: hasSummary ? `linear-gradient(135deg, 
      rgba(34, 197, 94, 0.05), 
      rgba(59, 130, 246, 0.05)
    )` : `linear-gradient(135deg, 
      rgba(100, 116, 139, 0.03), 
      rgba(71, 85, 105, 0.03)
    )`,
    pointerEvents: "none",
  },
  
  ...(hasSummary && {
    boxShadow: "0 25px 50px rgba(34, 197, 94, 0.1)",
    
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 35px 60px rgba(34, 197, 94, 0.15)",
    },
  }),
}));

const ContentHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1.5rem 1.5rem 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: "1rem",
});

const ContentBadge = styled(Chip)({
  background: `linear-gradient(135deg, 
    rgba(34, 197, 94, 0.2), 
    rgba(59, 130, 246, 0.2)
  )`,
  color: "#22c55e",
  border: "1px solid rgba(34, 197, 94, 0.3)",
  fontWeight: 600,
  
  "& .MuiChip-icon": {
    color: "#3b82f6",
  },
});

const SummaryContent = styled(Typography)(({ isTyping }) => ({
  color: "#e2e8f0",
  fontSize: "1.1rem",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  padding: "1.5rem",
  fontFamily: "'Inter', sans-serif",
  textAlign: "justify",
  position: "relative",
  
  ...(isTyping && {
    "&::after": {
      content: "'|'",
      animation: `${pulse} 1s ease-in-out infinite`,
      color: "#22c55e",
    },
  }),
  
  // Animated text appearance
  animation: `${textFlow} 0.8s ease-out`,
}));

const StatsRow = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginBottom: "1rem",
  flexWrap: "wrap",
});

const StatChip = styled(Chip)({
  background: "rgba(255, 255, 255, 0.05)",
  color: "#94a3b8",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "0.85rem",
});

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
    color: "#22c55e",
  },
});

const Summary = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = true;

  // states
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [style, setStyle] = useState("bullet");
  const [compressionLevel, setCompressionLevel] = useState(50);

  // Calculate text stats
  const originalWordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const summaryWordCount = summary.trim().split(/\s+/).filter(word => word.length > 0).length;
  const compressionRatio = originalWordCount > 0 ? Math.round((1 - summaryWordCount / originalWordCount) * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError("");
      
      const loadingToast = toast.loading("⚡ Summarizing your text...", {
        style: {
          background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const stylePrompts = {
        bullet: "Create a bullet-point summary with key points",
        paragraph: "Write a concise paragraph summary",
        executive: "Provide an executive summary with main findings",
        highlight: "Extract and highlight the most important information"
      };

      const compressionPrompt = compressionLevel < 30 
        ? "Keep it very brief and concise" 
        : compressionLevel > 70 
        ? "Provide a detailed summary with more context" 
        : "Create a balanced summary";

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: {
          contents: [{ 
            parts: [{ 
              text: `${stylePrompts[style]} of the following text. ${compressionPrompt}. Make it clear and well-structured:\n\n${text}` 
            }] 
          }],
        },
      });

      toast.dismiss(loadingToast);
      toast.success("✨ Text summarized successfully!", {
        style: {
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          borderRadius: '16px',
        },
      });

      const generatedSummary = response.data.candidates[0].content.parts[0].text;
      
      // Typing animation
      setIsTyping(true);
      setSummary("");
      
      // Simulate typing effect
      for (let i = 0; i <= generatedSummary.length; i++) {
        setTimeout(() => {
          setSummary(generatedSummary.slice(0, i));
          if (i === generatedSummary.length) setIsTyping(false);
        }, i * 12);
      }
      
    } catch (err) {
      console.error(err);
      toast.dismiss();
      setError("Error occurred while summarizing text");
      toast.error("Failed to summarize text", {
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

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!", {
      style: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });
  };

  const handleDownloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "text-summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Summary downloaded successfully!", {
      style: {
        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        color: 'white',
        borderRadius: '16px',
      },
    });
  };

  const handleClearSummary = () => {
    setSummary("");
    setIsTyping(false);
  };

  if (!loggedIn) {
    return (
      <SummaryContainer>
        <LoginMessage>
          🔐 LOG IN TO ACCESS
        </LoginMessage>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <MainContent>
        {/* Input Form */}
        <FormCard>
          <FormHeader>
            <HeaderIcon />
            <HeaderText>
              Text Summarizer
            </HeaderText>
          </FormHeader>

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
              placeholder="Paste your long text here... I'll make it concise! 📄"
              multiline
              rows={5}
              required
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />

            <StatsRow>
              <StatChip 
                icon={<TextFieldsIcon />} 
                label={`${originalWordCount} words`} 
                size="small"
              />
              {originalWordCount > 0 && (
                <StatChip 
                  icon={<SpeedIcon />} 
                  label={`~${Math.ceil(originalWordCount / 200)} min read`} 
                  size="small"
                />
              )}
            </StatsRow>

            <OptionsSection>
              <StyledSelect fullWidth>
                <InputLabel>Summary Style</InputLabel>
                <Select
                  value={style}
                  label="Summary Style"
                  onChange={(e) => setStyle(e.target.value)}
                  disabled={isLoading}
                >
                  <MenuItem value="bullet">🎯 Bullet Points</MenuItem>
                  <MenuItem value="paragraph">📝 Paragraph</MenuItem>
                  <MenuItem value="executive">📊 Executive</MenuItem>
                  <MenuItem value="highlight">✨ Key Highlights</MenuItem>
                </Select>
              </StyledSelect>

              <LengthSliderBox>
                <Typography variant="body2" color="#94a3b8" gutterBottom>
                  Compression Level: {compressionLevel}%
                </Typography>
                <StyledSlider
                  value={compressionLevel}
                  onChange={(e, value) => setCompressionLevel(value)}
                  min={10}
                  max={90}
                  disabled={isLoading}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </LengthSliderBox>
            </OptionsSection>

            <SummarizeButton
              type="submit"
              fullWidth
              disabled={isLoading || !text.trim()}
              isLoading={isLoading}
              sx={{ mb: 2 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Summarizing...
                </>
              ) : (
                <>
                  Summarize Text
                  <SummarizeIcon />
                </>
              )}
            </SummarizeButton>

            <BackLink to="/">
              ← Back to Home
            </BackLink>
          </form>
        </FormCard>

        {/* Summary Output Card */}
        <Slide direction="up" in={true} timeout={800}>
          <SummaryCard hasSummary={!!summary}>
            {summary ? (
              <>
                <ContentHeader>
                  <ContentBadge
                    icon={<TrendingUpIcon />}
                    label={`${style.charAt(0).toUpperCase() + style.slice(1)} • ${compressionRatio}% compressed`}
                    variant="outlined"
                  />
                  
                  <Box>
                    <ActionButton onClick={handleCopySummary} title="Copy Summary">
                      <ContentCopyIcon />
                    </ActionButton>
                    <ActionButton onClick={handleDownloadSummary} title="Download" sx={{ ml: 1 }}>
                      <DownloadIcon />
                    </ActionButton>
                    <ActionButton onClick={handleClearSummary} title="Clear" sx={{ ml: 1 }}>
                      <ClearIcon />
                    </ActionButton>
                  </Box>
                </ContentHeader>

                <StatsRow sx={{ px: 2 }}>
                  <StatChip 
                    icon={<TextFieldsIcon />} 
                    label={`${summaryWordCount} words`} 
                    size="small"
                  />
                  <StatChip 
                    icon={<CompressIcon />} 
                    label={`${compressionRatio}% reduction`} 
                    size="small"
                  />
                  <StatChip 
                    icon={<SpeedIcon />} 
                    label={`~${Math.ceil(summaryWordCount / 200)} min read`} 
                    size="small"
                  />
                </StatsRow>
                
                <SummaryContent isTyping={isTyping}>
                  {summary}
                </SummaryContent>
              </>
            ) : (
              <PlaceholderContent>
                <SummarizeIcon />
                <Typography variant="h5" color="inherit" textAlign="center">
                  Your Summary Will Appear Here
                </Typography>
                <Typography color="inherit" textAlign="center" sx={{ mt: 1, opacity: 0.7 }}>
                  Paste your text and I'll create a concise summary! ⚡
                </Typography>
              </PlaceholderContent>
            )}
          </SummaryCard>
        </Slide>
      </MainContent>
    </SummaryContainer>
  );
};

export default Summary;
