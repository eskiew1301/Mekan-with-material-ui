import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  ImageList,
  ImageListItem,
  Snackbar,
  Alert,
  Typography,
  Button,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Images = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [images, setImages] = useState([]); // State for images
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility state

  // Fetch images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}image-gallery`
        );
        console.log("Fetched Images:", response.data.images); // Ensure this includes valid `_id`
        setImages(response.data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };
    fetchImages();
  }, []);

  // Handle image deletion
  const handleDelete = async (id) => {
    console.log("Image ID received by handleDelete:", id); // Should show a valid ID
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}image-gallery/deleteImages`,
        { _id: id },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Delete response:", response.data);
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  return (
    <Box>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(200px, 1fr))!important",
        }}
      >
        {images.map((img, index) => (
          <Card key={index}>
            <ImageListItem sx={{ height: "100% !important" }}>
              {isLoggedIn && <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2)40%, rgba(0,0,0,0.7)100%",
                }}
                actionIcon={
                  <Tooltip title="Delete">
                    <DeleteForeverIcon
                      onClick={() => {
                        if (!img._id) {
                          console.error("Image does not have a valid ID:", img);
                          return;
                        }
                        handleDelete(img._id);
                      }}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </Tooltip>
                }
                position="top"
              />}
              <img
                src={img.url}
                alt="Gallery"
                loading="lazy"
                style={{ cursor: "pointer" }}
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>

      {/* Add Image Link */}
      {isLoggedIn && (
        <Box
          width={50}
          height={60}
          marginBottom="auto"
          marginLeft="auto"
          marginRight={10}
        >
          <Button
            LinkComponent={Link}
            to="/image-gallery/new"
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

export default Images;
