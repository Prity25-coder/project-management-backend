import { db } from "../../../config/firebase.config.js";

class ProjectService {
  getProjects = async () => {
    const querySnapshot = await db.collection("projects").get();

    const projects = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return { projects };
  };

  createProject = async (projectInfo) => {
    const projectRef = await db.collection("projects").add(projectInfo);

    // Fetch the newly created project document
    const createdProjectDoc = await projectRef.get();

    // Check if the document exists and return its data along with the project ID
    if (createdProjectDoc.exists) {
      return {
        project: {
          id: createdProjectDoc.id,
          ...createdProjectDoc.data(),
        },
      };
    }
    return {};
  };

  getProjectById = async (projectId) => {
    const projectDoc = await db.collection("projects").doc(projectId).get();

    return { project: { id: projectDoc.id, ...projectDoc.data() } };
  };

  updateProject = async (projectId, projectInfo) => {
    await db.collection("projects").doc(projectId).update(projectInfo);

    const project = await db.collection("projects").doc(projectId).get();

    if (project.exists) {
      return {
        project: {
          id: project.id,
          ...project.data(),
        },
      };
    }
    return {};
  };

  deleteProject = async (projectId) => {
    await db.collection("projects").doc(projectId).delete();
    return {};
  };
}

const projectService = new ProjectService();

export default projectService;
