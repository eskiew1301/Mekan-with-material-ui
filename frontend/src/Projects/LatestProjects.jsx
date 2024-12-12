import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const LatestProjects = () => {
  const [loadProjects, setLoadProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}projects/latest-projects`
        );
     

        if (response.data && response.data.latestProjects) {
          setLoadProjects(response.data.latestProjects); // Adjusted key
        } else {
          console.error("No projects found.");
          setError("No projects found.");
        }
      } catch (err) {
        console.error("Error fetching latest projects: ", err);
        setError("Error fetching latest projects.");
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xl: "repeat(4, 1fr)",
        lg: "repeat(4, 1fr)",
        md: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        xs: "repeat(1, 1fr)",
      }}
      gap={3}
      padding={3}
    >
      {loadProjects.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`http://localhost:5000/${item.image}` || "https://via.placeholder.com/345x140"}
            title={item.title || "Project Image"}
          />
          <CardContent>
            <Typography
              fontFamily={'"Nunito Sans", sans-serif'}
              gutterBottom
              variant="h5"
              component="div"
            >
              {item.title}
            </Typography>
            <Typography
              fontFamily={'"Nunito Sans", sans-serif'}
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => alert(`More about: ${item.title}`)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default LatestProjects;
