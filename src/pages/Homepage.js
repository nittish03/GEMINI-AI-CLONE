import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
import CodeIcon from "@mui/icons-material/Code";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

// Keyframe animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(0deg); }
  75% { transform: translateY(-15px) rotate(-1deg); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  25% { opacity: 0.7; transform: scale(1.2) rotate(90deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  75% { opacity: 0.8; transform: scale(0.9) rotate(270deg); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
  50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.4); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled components
const HomepageContainer = styled(Box)({
  minHeight: "100vh",
  background: `linear-gradient(-45deg, 
    #0f172a, 
    #1e293b, 
    #334155, 
    #1e293b,
    #0f172a
  )`,
  backgroundSize: "400% 400%",
  animation: `${gradientShift} 20s ease infinite`,
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

const LoginMessage = styled(Typography)({
  textAlign: "center",
  fontSize: "3.5rem",
  fontWeight: 900,
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
  animation: `${gradientShift} 8s ease infinite, ${float} 4s ease-in-out infinite`,
  marginTop: "20vh",
  textShadow: "0 0 50px rgba(147, 51, 234, 0.5)",
  letterSpacing: "-0.02em",
  position: "relative",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120%",
    height: "120%",
    background: "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    animation: `${glow} 3s ease-in-out infinite`,
    zIndex: -1,
  },
});

const MainContent = styled(Container)({
  paddingTop: "4rem",
  paddingBottom: "4rem",
  position: "relative",
  zIndex: 1,
});

const HeroSection = styled(Box)({
  textAlign: "center",
  marginBottom: "4rem",
  animation: `${slideInUp} 1s ease-out`,
});

const HeroTitle = styled(Typography)({
  fontSize: "4rem",
  fontWeight: 900,
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
  marginBottom: "1rem",
  fontFamily: "'Inter', 'Roboto', sans-serif",
  letterSpacing: "-0.03em",
  position: "relative",
  
  "@media (max-width: 600px)": {
    fontSize: "2.5rem",
  },
});

const HeroSubtitle = styled(Typography)({
  fontSize: "1.5rem",
  color: "#94a3b8",
  fontWeight: 400,
  marginBottom: "3rem",
  maxWidth: "600px",
  margin: "0 auto 3rem",
  lineHeight: 1.6,
  
  "@media (max-width: 600px)": {
    fontSize: "1.2rem",
  },
});

const HeroIcon = styled(RocketLaunchIcon)({
  fontSize: "3rem",
  color: "#f093fb",
  marginBottom: "2rem",
  animation: `${sparkle} 4s ease-in-out infinite, ${float} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 0 20px rgba(240, 147, 251, 0.5))",
});

const FeaturesGrid = styled(Grid)({
  "& .MuiGrid-item": {
    animation: `${slideInUp} 0.8s ease-out`,
    
    "&:nth-of-type(1)": { animationDelay: "0.1s" },
    "&:nth-of-type(2)": { animationDelay: "0.2s" },
    "&:nth-of-type(3)": { animationDelay: "0.3s" },
    "&:nth-of-type(4)": { animationDelay: "0.4s" },
  },
});

const FeatureCard = styled(Card)(({ gradient }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  padding: "0",
  height: "100%",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: gradient || `linear-gradient(135deg, 
      rgba(147, 51, 234, 0.05), 
      rgba(79, 172, 254, 0.05)
    )`,
    opacity: 0,
    transition: "opacity 0.4s ease",
  },
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: `linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 70%
    )`,
    transform: "rotate(45deg) translateX(-100%)",
    transition: "transform 0.6s ease",
  },
  
  "&:hover": {
    transform: "translateY(-15px) scale(1.02)",
    border: "1px solid rgba(147, 51, 234, 0.4)",
    boxShadow: "0 25px 50px rgba(147, 51, 234, 0.2), 0 0 50px rgba(147, 51, 234, 0.1)",
    
    "&::before": {
      opacity: 1,
    },
    
    "&::after": {
      transform: "rotate(45deg) translateX(100%)",
    },
    
    "& .feature-icon": {
      transform: "scale(1.2) rotate(10deg)",
      animation: `${sparkle} 2s ease-in-out infinite`,
    },
    
    "& .feature-title": {
      color: "#ffffff",
    },
    
    "& .feature-heading": {
      background: `linear-gradient(135deg, 
        #667eea 0%, 
        #f093fb 50%, 
        #4facfe 100%
      )`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  
  "&:active": {
    transform: "translateY(-10px) scale(0.98)",
  },
}));

const CardHeader = styled(Box)({
  padding: "2rem 2rem 1rem",
  textAlign: "center",
  position: "relative",
});

const FeatureTitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  transition: "color 0.3s ease",
});

const FeatureIcon = styled(Box)({
  width: "80px",
  height: "80px",
  margin: "0 auto 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0.05)
  )`,
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  
  "& .MuiSvgIcon-root": {
    fontSize: "2.5rem",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    background: `linear-gradient(45deg, 
      rgba(147, 51, 234, 0.5), 
      rgba(79, 172, 254, 0.5), 
      rgba(236, 72, 153, 0.5)
    )`,
    borderRadius: "22px",
    opacity: 0,
    transition: "opacity 0.4s ease",
    zIndex: -1,
  },
});

const CardContentBox = styled(CardContent)({
  padding: "0 2rem 2rem !important",
  textAlign: "center",
});

const FeatureHeading = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#e2e8f0",
  marginBottom: "0.5rem",
  transition: "all 0.3s ease",
  letterSpacing: "-0.01em",
});

const FeatureDescription = styled(Typography)({
  fontSize: "1rem",
  color: "#94a3b8",
  lineHeight: 1.6,
  fontWeight: 400,
});

const Homepage = () => {
  const navigate = useNavigate();
  const loggedIn = true;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!loggedIn) {
    return (
      <HomepageContainer>
        <LoginMessage>
          🔐 LOG IN TO ACCESS
        </LoginMessage>
      </HomepageContainer>
    );
  }

  const features = [
    {
      title: "Text Generation",
      icon: DescriptionRounded,
      heading: "TEXT SUMMARY",
      description: "Summarize long text into short sentences with AI-powered precision",
      onClick: () => navigate("/summary"),
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
      iconColor: "#22c55e",
    },
    {
      title: "Paragraph Generation",
      icon: FormatAlignLeftOutlined,
      heading: "PARAGRAPH",
      description: "Generate comprehensive paragraphs from simple words and ideas",
      onClick: () => navigate("/paragraph"),
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
      iconColor: "#3b82f6",
    },
    {
      title: "AI ChatBot",
      icon: ChatRounded,
      heading: "CHATBOT",
      description: "Have intelligent conversations with our advanced AI assistant",
      onClick: () => navigate("/chatbot"),
      gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.1))",
      iconColor: "#ec4899",
    },
    {
      title: "JavaScript Converter",
      icon: CodeIcon,
      heading: "JS CONVERTER",
      description: "Transform English descriptions into executable JavaScript code",
      onClick: () => navigate("/js-converter"),
      gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))",
      iconColor: "#f59e0b",
    },
  ];

  return (
    <HomepageContainer>
      <MainContent maxWidth="lg">
        <HeroSection>
          <HeroIcon />
          <HeroTitle>
            AI-Powered Tools Hub
          </HeroTitle>
          <HeroSubtitle>
            Transform your ideas with cutting-edge artificial intelligence. 
            Generate, summarize, chat, and code with the power of AI.
          </HeroSubtitle>
        </HeroSection>

        <FeaturesGrid container spacing={4}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid item xs={12} sm={6} lg={3} key={feature.title}>
                <FeatureCard
                  gradient={feature.gradient}
                  onClick={feature.onClick}
                >
                  <CardHeader>
                    <FeatureTitle className="feature-title">
                      {feature.title}
                    </FeatureTitle>
                    <FeatureIcon className="feature-icon">
                      <IconComponent 
                        sx={{ color: feature.iconColor }}
                      />
                    </FeatureIcon>
                  </CardHeader>
                  
                  <CardContentBox>
                    <FeatureHeading className="feature-heading">
                      {feature.heading}
                    </FeatureHeading>
                    <FeatureDescription>
                      {feature.description}
                    </FeatureDescription>
                  </CardContentBox>
                </FeatureCard>
              </Grid>
            );
          })}
        </FeaturesGrid>
      </MainContent>
    </HomepageContainer>
  );
};

export default Homepage;
