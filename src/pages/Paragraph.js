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


const Paragraph = () => {
  const theme = useTheme();
  // Media query for responsiveness
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // State hooks
  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");
  const loggedIn = true;  // Assuming user is logged in for this example

  // Handle the form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: `Write a paragraph on ${text}` }] }],
        },
      });
      toast.success("Paragraph Generated Successfully");

      setPara(response.data.candidates[0].content.parts[0].text);
      console.log(response.data.candidates[0].content.parts[0].text);
    } catch (err) {

      toast.error("Error generating paragraph");
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

  return !loggedIn ? (
    <>
      <h1 style={{ fontSize: "25vh", backgroundColor: "yellow" }} className="text-center">
        LOG IN TO ACCESS
      </h1>
    </>
  ) : (
    <>
      <Box className="paragraph-container">
        <Collapse in={Boolean(error)}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit}>
          <Typography variant="h3" className="paragraph-header">
            Generate Paragraph
          </Typography>

          <TextField
            placeholder="Add your topic"
            type="text"
            multiline={true}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ color: "white", mt: 2 }}
          >
            Generate
          </Button>

          <Typography mt={2}>
            Not this tool? <Link to="/">Go Back</Link>
          </Typography>
        </form>

        {para ? (
          <Card className="paragraph-card">
            <Typography p={2}>{para}</Typography>
          </Card>
        ) : (
          <Card className="paragraph-placeholder">
            <Typography
              variant="h5"
              color="natural.main"
              sx={{
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "450px",
              }}
            >
              Your Paragraph Will Appear Here
            </Typography>
          </Card>
        )}
      </Box>
    </>
  );
};

export default Paragraph;
