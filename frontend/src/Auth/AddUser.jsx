import React, { useState } from "react";
import { signupRequest } from "../api-helpers/helpers";
import { Box, Button, FormLabel, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
  const navigate=useNavigate()
  const isMatch = useMediaQuery(useTheme().breakpoints.down("md"));
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    signupRequest(inputs)
      .then((data) => {
        navigate('/users')
        localStorage.setItem("userId",data.user._id)
      })
      .then(() => {
        authActions.login();
      })
      .catch((err) => console.log(err));
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
            ADD USER
          </Typography>

          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            name="name"
            onChange={handelChange}
            margin="normal"
          />
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            value={inputs.email}
            name="email"
            onChange={handelChange}
            margin="normal"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
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
            Add User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUser;
