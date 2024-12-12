import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectDelete } from "../api-helpers/helpers";
import { useSelector } from "react-redux";

const ProjectItem = ({ title, description, image, id }) => {
  const navigate =useNavigate()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleDelete = () => {
    projectDelete(id)
      .then((data) => {
        navigate('/projects')
        setOpenSnackbar(true);
      })
      .catch((err) => console.log(err));
    
    
  };
  const isMatch = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Card
      width={isMatch ? "80%" :"50%" }
      sx={{
        height: "auto",
        margin: 1,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      <CardMedia component="img" alt={title} height="180" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <hr />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginTop: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
      {isLoggedIn && <CardActions sx={{ marginLeft: "auto" }}>
        <IconButton component={Link} to={`/projects/${id}`} color="warning">
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color="error">
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Project deleted successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProjectItem;
