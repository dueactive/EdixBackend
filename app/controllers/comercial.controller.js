const db = require("../models");
const jwt=require("jsonwebtoken");
const Comercial = db.comerciales;

// Retrieve all Tutorials from the database.
exports.login = (req, res) => {
  const usuario=req.body;
  const username = usuario.usuario;
  const userpwd=usuario.pwd;

  Comercial.find({ usuario: username })
  .then(data => {
    jwt.sign({user:usuario},'EdixSecretKey',(err,token)=>{
      res.json({
        token
      })
  
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
  
 
  
};


// Create and Save a new Comercial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Comercial
  const comercial = new Comercial({
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    pwd: req.body.pwd,
    email: req.body.email
    //email: req.body.email ? req.body.email : false
  });

  // Save Tutorial in the database
  comercial
    .save(comercial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comerical."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll =  (req, res) => {
  console.log(req.header['Authorization']);
  verifyToken(req, res);
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};
  
  jwt.verify(req.token,'EdixSecretKey',(error,authData)=>{
    if (error){
        res.sendStatus(400); 
    }else{
      Comercial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Comerciales."
        });
      });
    }
  })

  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comercial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Comercial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Comercial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Comercial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Comercial with id=${id}. Maybe Comerical was not found!`
        });
      } else res.send({ message: "Comercial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comercial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comercial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Coemercial with id=${id}. Maybe Coemercial was not found!`
        });
      } else {
        res.send({
          message: "Coemercial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Coemercial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Comercial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Coemerciales were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Coemerciales."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Comercial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
 
//Authorization:  Bearer <token>
function verifyToken(req, res, next){

  const bearerHeader=req.header['authorization'];
  console.log("bearerHeader: "+ bearerHeader);
  if (typeof bearerHeader !=='undefinied'){
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }

}
