import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetails, projectUpdate } from "../api-helpers/helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";

const UpdateProject = () => {
  const navigate= useNavigate()
    const [project, setProject] = useState()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const id = useParams().id;
  useEffect(() => {
    getProjectDetails(id)
      .then((data) => {

        setProject(data.project)

        setInputs({title: data.project.title, image:data.project.image, description:data.project.description})
    })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    projectUpdate(inputs, id).then((data)=>navigate('/projects')).catch(err=>console.log(err))
   
  };
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box margin="auto" padding={2} display="flex">
        <Typography
          fontWeight="bold"
          variant="h4"
          fontFamily={'"Nunito Sans", sans-serif'}
        >
          UPDATE PROJECT
        </Typography>
        {/* <AddCircleOutlineIcon
          sx={{ paddingLeft: 1, fontSize: "40px", color: "lightcoral" }}
        /> */}
      </Box>

      {project && <form onSubmit={handleSubmit}>
        <Box
          padding={3}
          width="80%"
          display="flex"
          margin="auto"
          flexDirection="column"
        >
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>Image</FormLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            variant="standard"
            margin="normal"
          />
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>Title</FormLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="standard"
            margin="normal"
          />
          <FormLabel fontFamily={'"Nunito Sans", sans-serif'}>
            Description
          </FormLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            variant="standard"
            margin="normal"
          />
          <Button
            sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </Box>
      </form>}
    </Box>
  );
};

export default UpdateProject;
