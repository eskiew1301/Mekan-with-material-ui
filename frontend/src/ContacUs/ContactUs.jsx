import React, { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import {sendEmail}  from "../api-helpers/helpers";

const ContactUs = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendEmail(inputs);
    if (response) {
      alert("Message sent successfully!");
      setInputs({ name: "", email: "", phone: "", message: "" });
    }
  };
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box margin="auto" padding={2} display="flex">
        <Typography
          fontWeight="bold"
          variant="h4"
          fontFamily={'"Nunito Sans", sans-serif'}
        >
          Send Us A Message
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          padding={3}
          width="80%"
          display="flex"
          margin="auto"
          flexDirection="column"
        >
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>
            TELL US YOUR FULL NAME
          </FormLabel>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            variant="standard"
            margin="normal"
          />
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>
            ENTER YOUR EMAIL
          </FormLabel>
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            variant="standard"
            margin="normal"
          />
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>
            ENTER PHONE NUMBER
          </FormLabel>
          <TextField
            name="phone"
            onChange={handleChange}
            value={inputs.phone}
            variant="standard"
            margin="normal"
          />
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>
            MESSAGE
          </FormLabel>
          <TextField
            name="message"
            onChange={handleChange}
            value={inputs.message}
            variant="standard"
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
            variant="contained"
            type="submit"
          >
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactUs;
