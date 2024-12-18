import React,{useEffect,useState} from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const [username,setUsername]= useState("");
  const email = (localStorage.getItem("email"));
  const params = {
    email:email
  }
  const getUsers= async()=>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/`,{params:params});
    setUsername(response.data.username);
    localStorage.setItem("username",username);
  };

  useEffect(()=>{
getUsers();
  },[username,email,loggedIn])

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        Gemini AI
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/home" p={1}>
            Home
          </NavLink>
          { <NavLink to="/" onClick={handleLogout} p={1}>
            Logout, {username}
          </NavLink> }
        </>
     ) : (
         <>
           <NavLink to="/register" p={1}>
             Sign Up
         </NavLink>
          <NavLink to="/" p={1}>
           Sign In
          </NavLink>
         </>
       )} 
    </Box>
  );
};

export default Navbar;