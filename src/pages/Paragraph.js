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
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));


  //register ctrl
  const handleSubmit = async (e) => {
    try{
      const loading = toast.loading("Summarizing...")
      e.preventDefault();
      const response = await axios({
        url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method:"post",
        data: 
        {contents:[{parts:[{"text":`Write a paragraph on ${text}`}]}]}
      })
      toast.dismiss(loading);
      toast.success("Summarized successfully")

      setPara(response.data.candidates[0].content.parts[0].text)
      console.log(response.data.candidates[0].content.parts[0].text)

    }catch(err){
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

  };
  return (
    !loggedIn?
    <>
  <h1 style={{fontSize:"25vh",backgroundColor:"yellow"}} className="text-center" >LOG IN TO ACCESS</h1>
  </>
  :
<>
      <Box
        width={isNotMobile ? "40%" : "80%"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.alt}
      >
        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <form >
          <Typography variant="h3">Generate Paragraph</Typography>
  
          <TextField
            placeholder="add your text"
            type="text"
            multiline={true}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
  
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ color: "white", mt: 2 }}
          >
            Generate
          </Button>
          <Typography mt={2}>
            not this tool ? <Link to="/">GO BACK</Link>
          </Typography>
        </form>
  
        {para ? (
          <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "fit-content",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
            }}
          >
            <Typography p={2}>{para}</Typography>
          </Card>
        ) : (
          <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "500px",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
            }}
          >
            <Typography
              variant="h5"
              color="natural.main"
              sx={{
                textAlign: "center",
                verticalAlign: "middel",
                lineHeight: "450px",
              }}
            >
              Your Paragraph Will Apprea Here
            </Typography>
          </Card>
        )}
      </Box>
</>
  );
};

export default Paragraph;