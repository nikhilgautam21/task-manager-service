const express = require("express");
const router = express.Router();

const {
  createTaskController,
  getAllTasksController,
  deleteTaskController,
  updateTaskController,
} = require("../controllers/task.controller");

router.post("/create", createTaskController);
router.get("/all", getAllTasksController);
router.delete("/delete/:id", deleteTaskController);
router.put("/update", updateTaskController);

module.exports = router;
