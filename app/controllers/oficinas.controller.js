const db = require("../models");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var fs = require('fs');  
var path = require('path');

const Oficinas = db.oficinas;



// Create and Save a new Oficina
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

      // Create a Comercial
      const oficinas = new Oficinas({
        title: req.body.title,
        description: req.body.description,
        is_available: Boolean(req.body.is_available),
        road_name: req.body.road_name,
        zip_code:  req.body.zip_code,
        province:  req.body.province,
        city:  req.body.city,
        modality:  req.body.modality,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        floor: req.body.floor,
        parking_public: Boolean(req.body.parking_public),
        parking_private: Boolean(req.body.parking_private),
        underground: req.body.underground,
        train:  req.body.train,
        bus: req.body.bus,
        comercial: req.body.comercial,
        extPath: req.file.mimetype.split('/')[1]
      });

      // Save Tutorial in the database
      const oficina=req.body;
      const title = oficina.title;
     
    
      Oficinas.findOne({ oficina: title })
      .then(data => {
        if (!data){
          oficinas
          .save(oficinas)
          .then(data => {
            res.send(data);
            //Incluimos la image.
            const id = data.id;
            console.log(req.body.mensaje)
            console.log(req.file)
            console.log(id);
            console.log (req.file.path);
            console.log (id + '.'+ req.file.mimetype.split('/')[1]);
            fs.renameSync(req.file.path,req.file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
            //
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

// Retrieve all Oficinas from the database.
exports.findAll =  (req, res) => {  

  const nombre = req.body.title;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};
  
  Oficinas.find(condition)
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

// Find a single Oficina with an id
exports.findOne = (req, res) => {
  //verifyToken(req, res);

  const id = req.params.id;

  Oficinas.findById(id)
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

// Update a Oficina by the id in the request
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Oficinas.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Comercial with id=${id}. Maybe Comerical was not found!`
      });
    } else 
      {
        //Borramos y creamos la nueva imagen.
        fs.findByIdAndRemove(file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
        fs.renameSync(req.file.path,req.file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
        //
        res.send({ message: "Comercial was updated successfully." });
      }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Comercial with id=" + id
    });
  });


};

// Delete a Oficina with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;

  Oficinas.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Coemercial with id=${id}. Maybe Coemercial was not found!`
      });
    } else {
      //Borramos y creamos la nueva imagen.
      fs.findByIdAndRemove(file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
      //
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

// Delete all Oficinas from the database.
exports.deleteAll = (req, res) => {


    Oficinas.deleteMany({})
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

// Find all published Oficinas
exports.findAllPublished = (req, res) => {

  Oficinas.find({ published: true })
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







