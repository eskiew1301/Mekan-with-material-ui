import React, { useState } from "react";
import { Box, Button, Card, CardMedia, FormLabel, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addProject } from "../api-helpers/helpers"; // Your API helper
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProject = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFile(URL.createObjectURL(file)); // Display the image preview
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    if (image) {
      formData.append("image", image);
    } else {
      throw new Error("No image file attached");
    }

  
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}projects/new`,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((data)=>console.log(data)).catch((err)=>{console.log(err)})

  
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box margin="auto" padding={2} display="flex">
        <Typography fontWeight="bold" variant="h4">
          ADD NEW PROJECT
        </Typography>
        <AddCircleOutlineIcon sx={{ paddingLeft: 1, fontSize: "40px", color: "lightcoral" }} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box padding={3} width="80%" display="flex" margin="auto" flexDirection="column">
          <FormLabel>Image</FormLabel>
          <TextField type="file" onChange={handleFileChange} variant="standard" margin="normal" />
          {file && (
            <Card>
              <CardMedia component="img" alt="Project Preview" height="140" image={file} />
            </Card>
          )}

          <FormLabel>Title</FormLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} variant="standard" margin="normal" />

          <FormLabel>Description</FormLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} variant="standard" margin="normal" />

          <Button variant="contained" type="submit" sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}>
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProject;
