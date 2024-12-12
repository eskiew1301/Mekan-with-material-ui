import Project from "../models/Project.model.js";
import { normalizePath } from "../middleware/upload.js";

export const getAllProjects = async (req, res) => {
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    console.log(err);
  }

  if (!projects) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ projects });
};
export const addProject = async (req, res, next) => {
  if (!req.file) {
      return res.status(400).json({ message: 'Image is required' }); // Check if image is uploaded
  }

  const { title, description } = req.body;
  const image = normalizePath(req.file.path);  // Path to the uploaded image

  const newProject = new Project({
      title,
      description,
      image,
  });

  try {
      await newProject.save();  // Save the new project to the database
      res.status(201).json({ project: newProject });  // Respond with the created project
  } catch (error) {
      console.error(error);
      next(error);  // Pass error to the next middleware
  }
};
  

export const getProjectById= async(req, res)=>{
    const id =req.params.pid
    let project
    try {
        project= await Project.findById(id)
    } catch (err) {
        console.log(err)
    }
    if (!project) {
        return res. status(404).json({message:"No Project Found"})
    }

    return res.status(200).json({project})
}
export const updateProject=async (req, res)=>{
    const id =req.params.pid
    const {title, description, image}=req.body
    if (!title && title.trim()==="" && !description && description.trim()==="" && !image&&image.trim==="") {
        return res.status(422).json({message: "Invalid Data"})
    }
    let project
    try {
        project=await Project.findByIdAndUpdate(id,{
            title, description, image
        })
    } catch (err) {
        console.log(err)
    }

    if (!project) {
        return res.status(500).json({message: 'Unable to Update'})
    }

    return res.status(200).json({message:"Project updated Successfully"})
}

export const deleteProject=async (req,res)=>{
    const id =req.params.pid
    let project
    try {
        project=await Project.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!project) {
        return res.status(500).json({message: 'Unable to Delete'})
    }
    return res.status(200).json({message:"Project Deleted Successfully"})
}

export const getLatestProjects=async(req, res, next)=>{
    let latestProjects;
  try {
    latestProjects = await Project.find()
    .sort({createdAt: -1})
    .limit(4)
    .exec()
  } catch (err) {
    const error =new Error(
      `Fetching latest projects failed`,
      500
    );
    return next(error);
  }

  res.json({
    latestProjects: latestProjects.map((project) => project.toObject({ getters: true })),
  });
}