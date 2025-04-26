import React, { useState } from "react";
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
} from "@mui/material";

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const loggedIn = true;

  // states
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  // register ctrl
  const handleSubmit = async (e) => {
    try {
      const loading = toast.loading("responding...");
      e.preventDefault();
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: { contents: [{ parts: [{ text }] }] },
      });
      toast.dismiss(loading);
      toast.success("Response generated successfully!");

      setResponse(response.data.candidates[0].content.parts[0].text);
      console.log(response.data.candidates[0].content.parts[0].text);
    } catch (err) {
      console.log(err);
      setError("Error occurred while generating response");
      setTimeout(() => setError(""), 5000);
    }
  };

  return !loggedIn ? (
    <h1 className="login-message">LOG IN TO ACCESS</h1>
  ) : (
    <Box className="chat-container">
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form>
        <Typography variant="h3" className="chat-header">
          Ask with Chatbot
        </Typography>

        <TextField
          placeholder="Add your text"
          type="text"
          multiline
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Chat
        </Button>

        <Typography mt={2}>
          Not this tool? <Link to="/">Go Back</Link>
        </Typography>
      </form>

      {response ? (
        <Card className="response-card">
          <Typography p={2}>{response}</Typography>
        </Card>
      ) : (
        <Card className="response-card">
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", lineHeight: "450px" }}
          >
            Bot Response
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ChatBot;
