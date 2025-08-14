const { where } = require("sequelize");
const Task = require("../models/task.model");

const createTaskController = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is missing" });
    }
    if (!description) {
      res.status(400).json({ message: "Description is missing" });
    }
    const task = await Task.create({ title, description, status });
    console.log(task);
    res.status(200).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasksController = async (req, res) => {
  try {
    const allTasks = await Task.findAll();
    res.status(200).json({ tasks: allTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
    }
    const taskExists = await Task.findOne({ where: { id } });
    console.log(taskExists, "taskExists");
    if (taskExists) {
      const isDeleted = await Task.destroy({
        where: {
          id,
        },
      });
      console.log(isDeleted, "isDeleted");
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: `Task with ID: ${id} doesn't exists` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { id, title, description, status } = req.body;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
    }
    const updatedTask = await Task.update(
      { title, description, status },
      { where: { id } }
    );
    if (updatedTask)
      res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTaskController,
  getAllTasksController,
  deleteTaskController,
  updateTaskController,
};
