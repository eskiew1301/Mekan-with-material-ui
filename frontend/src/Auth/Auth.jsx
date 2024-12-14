import React, { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { loginRequest } from "../api-helpers/helpers";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const isMatch = useMediaQuery(useTheme().breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
   

    loginRequest(inputs)
      .then((data) => localStorage.setItem("userId", data.id))
      .then(() => {
        dispatch(authActions.login());
      })
      .catch((err) => console.log(err));
      navigate('/')
  };
  const handelChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box
      width={isMatch ? '90%' : "40%"}
      borderRadius={10}
      boxShadow={"5px 5px 10px #ccc"}
      margin="auto"
      marginTop={10}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          width="80%"
          padding={5}
          margin="auto"
        >
          <Typography variant="h4" textAlign="center">
            Login
          </Typography>
          <Typography m={2} variant="caption" textAlign="center">
            Restricted to administrators. Please log in to proceed.
          </Typography>
          <FormLabel>Email</FormLabel>
          <TextField
            value={inputs.email}
            name="email"
            onChange={handelChange}
            margin="normal"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            value={inputs.password}
            name="password"
            onChange={handelChange}
            margin="normal"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10 }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
