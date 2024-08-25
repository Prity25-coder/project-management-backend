import expressAsyncHandler from "express-async-handler";

import projectService from "../services/project.service.js";
import { SuccessResponse } from "../../../models/apiResponse.js";
import RESPONSE_TITLE from "../../../constants/responseTitle.js";
import RESPONSE_CODE from "../../../constants/responseCode.js";

class ProjectController {
  getAllProjects = expressAsyncHandler(async (req, res) => {
    const allProjects = await projectService.getProjects();

    const response = new SuccessResponse({
      success: true,
      data: allProjects,
      title: RESPONSE_TITLE.OK,
      message: "All project fetched successfully.",
      statusCode: RESPONSE_CODE.OK,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });

  getProjectById = expressAsyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

    const response = new SuccessResponse({
      success: true,
      data: project,
      title: RESPONSE_TITLE.OK,
      message: "Project fetched successfully.",
      statusCode: RESPONSE_CODE.OK,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });

  addProject = expressAsyncHandler(async (req, res) => {
    const { projectName, description, status } = req.body;

    const project = await projectService.createProject({
      projectName,
      description,
      status,
    });

    const response = new SuccessResponse({
      success: true,
      data: project,
      title: RESPONSE_TITLE.CREATED,
      message: "project created successfully.",
      statusCode: RESPONSE_CODE.CREATED,
    });

    return res.status(RESPONSE_CODE.CREATED).json(response);
  });

  updateProject = expressAsyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { projectName, description, status } = req.body;

    const updateProject = await projectService.updateProject(projectId, {
      projectName,
      description,
      status,
    });

    const response = new SuccessResponse({
      success: true,
      data: updateProject,
      title: RESPONSE_TITLE.UPDATED,
      message: "project updated successfully.",
      statusCode: RESPONSE_CODE.OK,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });

  deleteProject = expressAsyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const deletedProject = await projectService.deleteProject(projectId);

    const response = new SuccessResponse({
      success: true,
      data: deletedProject,
      title: RESPONSE_TITLE.DELETED,
      message: "project deleted successfully.",
      statusCode: RESPONSE_CODE.OK,
    });

    return res.status(RESPONSE_CODE.OK).json(response);
  });
}

const projectController = new ProjectController();

export default projectController;
