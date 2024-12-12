import React, { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewPdfDocument = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setNotification({
        open: true,
        message: "Please select a file",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}document-gallery/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate('/document-gallery')
      setNotification({
        open: true,
        message: response.data.message || "Document uploaded successfully!",
        severity: "success",
      });
      setFile(null); // Reset file after upload
    } catch (error) {
      console.error("File upload error:", error);
      setNotification({
        open: true,
        message: "Failed to upload the document",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: "auto",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" marginBottom={2} textAlign="center">
        Upload PDF File
      </Typography>
      <Box>
        <input
          type="file"
          id="file"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label htmlFor="file">
          <Button
            variant="contained"
            component="span"
            endIcon={<AttachmentIcon sx={{ fontSize: 20 }} />}
            fullWidth
          >
            Choose File
          </Button>
        </label>
        {file && (
          <Box marginTop={2} textAlign="center">
            <Typography variant="subtitle1">Selected File:</Typography>
            <Typography variant="body2">{file.name}</Typography>
          </Box>
        )}
      </Box>
      <Button
        onClick={handleFileUpload}
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Upload
      </Button>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddNewPdfDocument;
