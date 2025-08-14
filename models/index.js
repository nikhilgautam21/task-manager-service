const User = require("./user.model");
const Task = require("./task.model");

// Associations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Task };
