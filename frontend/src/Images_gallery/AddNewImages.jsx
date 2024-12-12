import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewImage = () => {
    const navigate =useNavigate()
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file); // Match the field name in the backend
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}image-gallery/new`, // Ensure the URL structure
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate('/image-gallery')
      alert("Images uploaded successfully!");
      setSelectedFiles([]); // Clear the selected files after upload
    } catch (error) {
      console.error("Upload Failed:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <Box
      margin="auto"
      marginTop='auto'
      width={300}
      height="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="1px dashed gray"
      borderRadius={2}
      padding={2}
    >
      <Typography variant="h6" marginBottom={2}>
        Upload Multiple Images
      </Typography>
      <input
        id="file-input"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Choose Images
        </Button>
      </label>
      {selectedFiles.length > 0 && (
        <Box marginTop={2}>
          <Typography variant="subtitle1">Selected Images:</Typography>
          <Box marginTop={1}>
            {selectedFiles.map((file, index) => (
              <Typography key={index} variant="body2">
                {file.name}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      <Button
        onClick={handlePhotoUpload}
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default AddNewImage;
