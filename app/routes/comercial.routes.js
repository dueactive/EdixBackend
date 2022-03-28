module.exports = app => {
  const comerciales = require("../controllers/comercial.controller.js");

  var router = require("express").Router();

  // Create a new comercial
  router.post("/", comerciales.create);

  // Retrieve all comerciales
  router.get("/", comerciales.findAll);

  // Retrieve all published comerciales
  router.get("/published", comerciales.findAllPublished);

  // Retrieve a single comercial with id
  router.get("/:id", comerciales.findOne);

  // Update a comercial with id
  router.put("/:id", comerciales.update);

  // Delete a comercial with id
  router.delete("/:id", comerciales.delete);

  // Create a new comercial
  router.delete("/", comerciales.deleteAll);

  app.use("/api/comerciales", router);
};
