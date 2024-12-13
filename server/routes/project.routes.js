const { Router } = require("express");
const { addProject, deleteProject, getAllProjects, getLatestProjects, getProjectById, updateProject } = require("../controllers/project.controller");
const { fileUpload } = require("../middlewares/upload");

const projectRouter = Router();

projectRouter.get('/', getAllProjects);
projectRouter.get('/latest-projects', getLatestProjects);
projectRouter.get('/:pid', getProjectById);

projectRouter.post('/new', fileUpload.single('image'), addProject);
projectRouter.put('/:pid', updateProject);
projectRouter.delete('/:pid', deleteProject);

module.exports = projectRouter;
