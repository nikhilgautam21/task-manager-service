const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const pingRoutes = require("./routes/ping.routes");
const taskRoutes = require("./routes/task.routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/ping", pingRoutes);
app.use("/task", taskRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
