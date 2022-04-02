
module.exports = app => {
  const comerciales = require("../controllers/comercial.controller.js");
  const { checkToken } = require('./middlewares');

  var router = require("express").Router();

  // login  comercial
  router.post("/login", comerciales.login);

  // Create a new comercial
  router.post("/", checkToken,comerciales.create);

  // Retrieve all comerciales
  router.get("/",checkToken, comerciales.findAll);
  
  // Retrieve all comerciales filtrado por nombre
  router.post("/comercialesBynombre",checkToken, comerciales.findAll);

  // Retrieve all published comerciales
  router.get("/published", checkToken,comerciales.findAllPublished);

  // Retrieve a single comercial with id
  router.get("/:id",checkToken, comerciales.findOne);

  // Update a comercial with id
  router.put("/:id",checkToken, comerciales.update);

  // Delete a comercial with id
  router.delete("/:id",checkToken, comerciales.delete);

  // Create a new comercial
  router.delete("/", checkToken,comerciales.deleteAll);

  app.use("/api/comerciales", router);
};
