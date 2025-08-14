const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const pingRoutes = require("./routes/ping.routes");
const taskRoutes = require("./routes/task.routes");
const requestLogger = require("./utils/requestLogger");
const logger = require("./logger");

dotenv.config();
const app = express();

app.use(express.json());
app.use(requestLogger);

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    user: req.user ? req.user.id : "guest",
  });
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.use("/auth", authRoutes);
app.use("/ping", pingRoutes);
app.use("/task", taskRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
