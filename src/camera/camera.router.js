const {
  createCamera,
  getCamera,
  getCameraById,
} = require("./camera.controller");
const cameraRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

cameraRouter.post("/", createCamera);
cameraRouter.get("/", getCamera);
cameraRouter.get("/:id", getCameraById);

module.exports = cameraRouter;
