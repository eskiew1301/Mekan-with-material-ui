import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LatestProjects from "../Projects/LatestProjects";

const Latest_Projects = [
  {
    id: 1,
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni autem, ullam quos minima error ab eius quaerat ipsum explicabo dignissimos officiis quibusdam totam voluptates cumque et adipisci consequuntur corrupti eveniet ipsa necessitatibus doloremque repellat nostrum. Consectetur rerum eum ad autem. Iure reiciendis velit similique excepturi esse corporis beatae soluta.",
    image: "/img2.jpg",
  },
  {
    id: 2,
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni autem, ullam quos minima error ab eius quaerat ipsum explicabo dignissimos officiis quibusdam totam voluptates cumque et adipisci consequuntur corrupti eveniet ipsa necessitatibus doloremque repellat nostrum. Consectetur rerum eum ad autem. Iure reiciendis velit similique excepturi esse corporis beatae soluta.",
    image: "/img3.jpg",
  },
  {
    id: 3,
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni autem, ullam quos minima error ab eius quaerat ipsum explicabo dignissimos officiis quibusdam totam voluptates cumque et adipisci consequuntur corrupti eveniet ipsa necessitatibus doloremque repellat nostrum. Consectetur rerum eum ad autem. Iure reiciendis velit similique excepturi esse corporis beatae soluta.",
    image: "/img4.jpg",
  },
  {
    id: 4,
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni autem, ullam quos minima error ab eius quaerat ipsum explicabo dignissimos officiis quibusdam totam voluptates cumque et adipisci consequuntur corrupti eveniet ipsa necessitatibus doloremque repellat nostrum. Consectetur rerum eum ad autem. Iure reiciendis velit similique excepturi esse corporis beatae soluta.",
    image: "/img5.jpg",
  },
  {
    id: 5,
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni autem, ullam quos minima error ab eius quaerat ipsum explicabo dignissimos officiis quibusdam totam voluptates cumque et adipisci consequuntur corrupti eveniet ipsa necessitatibus doloremque repellat nostrum. Consectetur rerum eum ad autem. Iure reiciendis velit similique excepturi esse corporis beatae soluta.",
    image: "/img5.jpg",
  },
];

const Home = () => {
  const isMatch = useMediaQuery(useTheme().breakpoints.between("md", "sm"));
  return (
    <Box position="relative" width="100%" height="90vh">
      <img src="/img5.jpg" alt="background" width="100%" height="50%" />
      <Typography
        fontFamily={'"Nunito Sans", sans-serif'}
        fontWeight="bold"
        variant="h2"
        textAlign="center"
        width="100%"
        fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
        sx={{ position: "absolute", top: "20%", color: "white" }}
      >
        MEKAN QUALITY MANAGEMENT AND TRAINING PLC.
      </Typography>
      <Typography
        fontFamily={'"Nunito Sans", sans-serif'}
        variant="h4"
        fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
        textAlign="center"
        width="100%"
        sx={{ position: "absolute", top: "30%", color: "#b2c8df" }}
      >
        Compliance, Quality Management, Training
      </Typography>
      <Button
        LinkComponent={Link}
        to="/about-us"
        variant="contained"
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          bgcolor: "#32cd32",
        }}
      >
        Learn More
      </Button>
      <Box width="100%" height="40%" margin={2}>
        <Typography
          fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
          margin={2}
          variant="h4"
          textAlign="center"
        >
          Latest Projects
        </Typography>
        <LatestProjects />
      </Box>
    </Box>
  );
};

export default Home;
