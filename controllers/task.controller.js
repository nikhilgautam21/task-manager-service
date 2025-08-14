const { Task } = require("../models");

const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({ success, message, data });
};

const createTaskController = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    if (!title) return sendResponse(res, 400, false, "Title is required");
    if (!description)
      return sendResponse(res, 400, false, "Description is required");

    const task = await Task.create({ title, description, status, userId });
    return sendResponse(res, 201, true, "Task created successfully", task);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const getAllTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const allTasks = await Task.findAll({ where: { userId } });
    return sendResponse(res, 200, true, "Tasks fetched successfully", allTasks);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const getTaskByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (!id) return sendResponse(res, 400, false, "Task ID is required");

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return sendResponse(res, 404, false, "Task not found");

    return sendResponse(res, 200, true, "Task fetched successfully", task);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { id, title, description, status } = req.body;
    const userId = req.user.id;

    if (!id) return sendResponse(res, 400, false, "Task ID is required");

    const [updatedCount] = await Task.update(
      { title, description, status },
      { where: { id, userId } }
    );

    if (updatedCount === 0)
      return sendResponse(res, 404, false, "Task not found");

    return sendResponse(res, 200, true, "Task updated successfully");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) return sendResponse(res, 400, false, "Task ID is required");

    const deletedCount = await Task.destroy({ where: { id, userId } });

    if (deletedCount === 0)
      return sendResponse(res, 404, false, "Task not found");

    return sendResponse(res, 200, true, "Task deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
};
