import { Router } from "express";
import { addProject, deleteProject, getAllProjects, getLatestProjects, getProjectById, updateProject } from "../controllers/project.controller.js";
import {fileUpload} from "../middleware/upload.js";
const projectRouter = Router()

projectRouter.get('/', getAllProjects)
projectRouter.get('/latest-projects', getLatestProjects)
projectRouter.get('/:pid', getProjectById)

projectRouter.post('/new', fileUpload.single('image'), addProject)
projectRouter.put('/:pid', updateProject)
projectRouter.delete('/:pid', deleteProject)



export default projectRouter
