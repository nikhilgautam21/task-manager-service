const express = require("express");
const router = express.Router();

const {
  createTaskController,
  getAllTasksController,
  deleteTaskController,
  updateTaskController,
  getTaskByIdController,
} = require("../controllers/task.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, createTaskController);
router.get("/", authMiddleware, getAllTasksController);
router.get("/:id", authMiddleware, getTaskByIdController);
router.delete("/delete/:id", authMiddleware, deleteTaskController);
router.put("/update", authMiddleware, updateTaskController);

module.exports = router;
