import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Link,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Use RouterLink for routing
import AddIcon from "@mui/icons-material/Add";

const DocumentGallery = () => {
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [documents, setDocuments] = useState([]); // Initialize as an empty array
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility state

  // Fetch documents from the backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}document-gallery`
        );
        // Assuming the response has an array of documents in response.data.data
        if (Array.isArray(response.data.data)) {
          setDocuments(response.data.data); // Use response.data.data here
        } else {
          console.error("Response data is not an array", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments(); // Call the fetchDocuments function
  }, []); // Empty dependency array to run only on mount

  const handleDelete = async (id) => {
    try {
      // Make the delete request to the backend
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}document-gallery/${id}`
      );
      // Update documents after deletion
      setDocuments(documents.filter((item) => item.document !== id));
      setNotification({
        message: "Document deleted successfully",
        type: "success",
      });
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to delete document:", error);
      setNotification({ message: "Failed to delete document", type: "error" });
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 3 }}
      >
        Document Gallery
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(documents) && documents.length > 0 ? (
          documents.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {item.document}
                  </Typography>
                  <a
                    href={`${
                      import.meta.env.VITE_BACKEND_URL
                    }uploads/pdfDocument/${item.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    Open PDF
                  </a>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <IconButton
                      onClick={() => handleDelete(item._id)} // Delete function call
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              No documents found.
            </Typography>
          </Grid>
        )}
      </Grid>
      {isLoggedIn && (
        <Box
          width={50}
          height={60}
          marginBottom="auto"
          marginLeft="auto"
          marginRight={10}
        >
          <Button
            LinkComponent={RouterLink}
            to="/document-gallery/new"
            variant="contained"
            sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
          >
            <AddIcon />
          </Button>
        </Box>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={notification.type}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default DocumentGallery;
