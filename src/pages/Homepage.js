import React from "react";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage = () => {
  const navigate = useNavigate();
  const loggedIn = true;

  if (!loggedIn) {
    return <h1 className="login-message">LOG IN TO ACCESS</h1>;
  }

  return (
    <div className="homepage-container">
      <FeatureCard
        title="Text Generation"
        icon={<DescriptionRounded className="card-icon" />}
        heading="TEXT SUMMARY"
        description="Summarize long text into short sentences"
        onClick={() => navigate("/summary")}
      />
      <FeatureCard
        title="Paragraph Generation"
        icon={<FormatAlignLeftOutlined className="card-icon" />}
        heading="PARAGRAPH"
        description="Generate paragraph with words"
        onClick={() => navigate("/paragraph")}
      />
      <FeatureCard
        title="AI ChatBot"
        icon={<ChatRounded className="card-icon" />}
        heading="Chatbot"
        description="Chat with AI Chatbot"
        onClick={() => navigate("/chatbot")}
      />
      <FeatureCard
        title="JavaScript Converter"
        icon={<ChatRounded className="card-icon" />}
        heading="JS CONVERTER"
        description="Translate English to JavaScript code"
        onClick={() => navigate("/js-converter")}
      />
    </div>
  );
};

const FeatureCard = ({ title, icon, heading, description, onClick }) => (
  <div className="feature-box">
    <h2 className="feature-title">{title}</h2>
    <div className="card" onClick={onClick}>
      {icon}
      <div className="card-content">
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default Homepage;
