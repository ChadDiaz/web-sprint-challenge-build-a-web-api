const Actions = require("../actions/actions-model.js");
const Projects = require("../projects/projects-model.js");

// NOTE Below is all Actions middlewares

async function validateActionId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ message: `${id} is not a valid id.`, status: 404 });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateActionBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({ message: "missing actions data. Please provide project_id, description and notes", status: 400 });
    } else if (!body.project_id) {
      next({ message: "missing project id", status: 400 });
    } else if (!body.description) {
      next({ message: "missing action description", status: 400 });
    } else if (!body.notes) {
      next({ message: "missing action notes", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
}

// NOTE Below is all Project middlewares

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ message: `${id} is not a valid id.`, status: 404 });
    }
  } catch (err) {
    next({ error: err, message: err.message, status: 500 });
  }
}

function validateProjectBody(req, res, next) {
  const body = req.body;
  try {
    if (body && Object.keys(body).length === 0) {
      next({ message: "missing project info. Please provide name and description", status: 400 });
    } else if (!body.name) {
      next({ message: "missing project name", status: 400 });
    } else if (!body.description) {
      next({ message: "missing project description", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
}

module.exports = {
  validateActionId: validateActionId,
  validateActionBody: validateActionBody,
  validateProjectId: validateProjectId,
  validateProjectBody: validateProjectBody,
};