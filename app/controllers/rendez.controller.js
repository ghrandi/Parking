const Rendez = require("../models/rendez.model.js");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const rendez = new Rendez({
    idpark: req.body.idpark || "Untitled Admin",
    type: req.body.type,
	date:req.body.date,
	useremail:req.body.useremail,
	temps:req.body.temps,
   
  });

  // Save admin in the database
  rendez
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
  Rendez.find()
    .then((rendezs) => {
      res.send(rendezs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
 Rendez.findById(req.params.rendezId)
    .then((rendez) => {
      if (!rendez) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      res.send(rendez);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.rendezId,
      });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.type) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
 Rendez.findByIdAndUpdate(
    req.params.rendezId,
    {
      type: req.body.type || "Untitled admin",
      idpark: req.body.idpark,
	  date:req.body.date,
	useremail:req.body.useremail,
	temps:req.body.temps,

    },
    { new: true }
  )
    .then((rendez) => {
      if (!rendez) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      res.send(rendez);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.rendezId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
 Rendez.findByIdAndRemove(req.params.rendezId)
    .then((dispo) => {
      if (!dispo) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.rendezId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.rendezId,
      });
    });
};
