import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ProjectItem from './ProjectItem';
import { getAllProjects } from "../api-helpers/helpers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Projects = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const [projects, setProjects] = useState();
  useEffect(() => {
    getAllProjects()
      .then((data) => setProjects(data?.projects))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      display="flex"
      padding={3}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {projects &&
        projects.map((project, index) => (
          <ProjectItem
            title={project.title}
            image={`${import.meta.env.VITE_BACKEND_URL}${project.image}`}
            description={project.description}
            id={project._id}
            key={index}
          />
        ))}
        {isLoggedIn && <Box width={50} height={60} marginBottom='auto' marginLeft='auto' marginRight={10}>
          <Button  LinkComponent={Link} to='/projects/new' variant="contained" sx={{width:'100%',height:'100%', borderRadius:'50%'}}><AddIcon /></Button>
        </Box>}
    </Box>
  );
};

export default Projects;
