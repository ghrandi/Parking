const Dispo = require("../models/dispo.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const dispo = new Dispo({
    idpark: req.body.idpark || "Untitled Admin",
    nombre: req.body.nombre,
   
  });

  // Save admin in the database
  dispo
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the admin.",
      });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
 Dispo.find()
    .then((dispos) => {
      res.send(dispos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
 Dispo.findById(req.params.dispoId)
    .then((dispo) => {
      if (!dispo) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      res.send(dispo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.dispoId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
 Dispo.findByIdAndUpdate(
    req.params.dispoId,
    {
      nombre: req.body.nombre || "Untitled admin",
      idpark: req.body.idpark,

    },
    { new: true }
  )
    .then((dispo) => {
      if (!dispo) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      res.send(dispo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.dispoId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Dispo.findByIdAndRemove(req.params.dispoId)
    .then((dispo) => {
      if (!dispo) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.dispoId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.dispoId,
      });
    });
};
