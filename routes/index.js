const mainRoutes = require("./main");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", mainRoutes);
  app.use("*", (req, res) => {
    res.status(404).render("error", { error: "Not Found", title: "Error" });
  });
};

module.exports = constructorMethod;
