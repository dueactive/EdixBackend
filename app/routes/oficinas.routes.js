
module.exports = app => {
    const oficinas = require("../controllers/oficinas.controller.js");
    const { checkToken } = require('./middlewares');

  
    const multer = require('multer')({
        dest: 'app/images'
      })
  


  
  var router = require("express").Router();
 
    // Create a new oficina +  Upload images
    router.post("/", checkToken,multer.single('attachment') ,oficinas.create);
    // Retrieve all oficinas
    router.get("/",checkToken, oficinas.findAll);
    // Retrieve all oficinas filtrado por nombre
    router.post("/oficinasBynombre",checkToken, oficinas.findAll);
    // Retrieve all published oficinas
    router.get("/published", checkToken,oficinas.findAllPublished);
    // Retrieve a single oficinas with id
    router.get("/:id",checkToken, oficinas.findOne);
    // Update a oficinas with id
    router.put("/:id",checkToken, oficinas.update);
    // Delete a oficinas with id
    router.delete("/:id",checkToken, oficinas.delete);
    // Delete all oficinas
    router.delete("/", checkToken,oficinas.deleteAll);


    app.use("/api/oficinas", router);
  };
  