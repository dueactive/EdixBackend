const db = require("../models");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const EmailContact = db.emailcontact;



// Create and Save a new Oficina
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

      // Create a EmailContact
      const emailContact = new EmailContact({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        pwd: bcrypt.hashSync(req.body.pwd, 10),
        email: req.body.email
        //email: req.body.email ? req.body.email : false
      });

      // Save Tutorial in the database
      const usuario=req.body;
      const username = usuario.usuario;
     
    
      EmailContact.findOne({ usuario: username })
      .then(data => {
        if (!data){
          emailContact
          .save(emailContact)
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