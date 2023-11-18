const Park = require("../models/park.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.emplacement) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const park = new Park({
    emplacement: req.body.emplacement || "Untitled Admin",
    capacite: req.body.capacite,
    tarif: req.body.tarif,
   
  });

  // Save admin in the database
  park
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
  Park.find()
    .then((parks) => {
      res.send(parks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Park.findById(req.params.parkId)
    .then((park) => {
      if (!park) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      res.send(park);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.parkId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.emplacement) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Park.findByIdAndUpdate(
    req.params.parkId,
    {
      emplacement: req.body.emplacement || "Untitled admin",
       capacite: req.body.capacite,
    tarif: req.body.tarif,
    },
    { new: true }
  )
    .then((park) => {
      if (!park) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      res.send(park);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.parkId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Park.findByIdAndRemove(req.params.parkId)
    .then((park) => {
      if (!park) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.parkId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.parkId,
      });
    });
};
