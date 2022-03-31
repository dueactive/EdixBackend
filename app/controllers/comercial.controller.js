const db = require("../models");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const Comercial = db.comerciales;

// Retrieve all Tutorials from the database.
exports.login = (req, res) => {
  
  const usuario=req.body;

  const username = usuario.usuario;
  //const userpwd=bcrypt.hashSync(usuario.pwd, 10);
  const userpwd=usuario.pwd
  
  Comercial.findOne({ usuario: username })
  //Comercial.findOne({ usuario: username , pwd: userpwd})
  .then(data => {
    if (data!=null){
       var result = bcrypt.compareSync(req.body.pwd, data.pwd);
        if (result) {
          jwt.sign({user:usuario},'EdixSecretKey',(err,token)=>{
          //jwt.sign({user:usuario},'EdixSecretKey',{ expiresIn: '20m' },(err,token)=>{
            res.json({
              token
            })
          })
        } else {
          res.status(200).send({
            message:
              err.message || "Usuario o Contraseña incorrectos."
          });
        }
       
    } else {
      res.status(200).send({
        message:
          err.message || "Usuario o Contraseña incorrectos."
      });
    }
    
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
        pwd: bcrypt.hashSync(req.body.pwd, 10),
        email: req.body.email
        //email: req.body.email ? req.body.email : false
      });

      // Save Tutorial in the database
      const usuario=req.body;
      const username = usuario.usuario;
     
    
      Comercial.findOne({ usuario: username })
      .then(data => {
        if (data=null){
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

        } else {
          res.status(200).send({
            message:
              err.message || "Ya existe este usuario"
          });
        }
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll =  (req, res) => {  

  const nombre = req.body.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};
  
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
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  //verifyToken(req, res);

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

