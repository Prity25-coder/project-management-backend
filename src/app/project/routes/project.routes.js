import { Router } from "express";
import isLoggedIn from "../../../common/middlewares/isLoggedIn.middleware.js";
import projectController from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.use(isLoggedIn);

// api/v1/projects

projectRouter.get("/", projectController.getAllProjects);

projectRouter.post("/", projectController.addProject);

projectRouter.get("/:projectId", projectController.getProjectById);

projectRouter.patch("/:projectId", projectController.updateProject);

projectRouter.delete("/:projectId", projectController.deleteProject);

export default projectRouter;
