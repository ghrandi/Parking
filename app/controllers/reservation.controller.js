const Reservation = require("../models/reservation.model.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.emplacement) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }

  // Create a user
  const reservation = new Reservation({
    idpark: req.body.idpark,
    date: req.body.date,
    temps: req.body.temps,
	emplacement:req.body.emplacement,
	numplace:req.body.numplace,
    
  });

  // Save user in the database
  reservation
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.send(reservations);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  Reservation.findById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      res.send(reservation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.reservationId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.emplacement) {
    return res.status(400).send({
      message: "user content can not be empty",
    });
  }

  // Find user and update it with the request body
  Reservation.findByIdAndUpdate(
    req.params.reservationId,
    {
        idpark: req.body.idpark,
    date: req.body.date,
    temps: req.body.temps,
    emplacement:req.body.emplacement,
	numplace:req.body.numplace,
    },
    { new: true }
  )
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      res.send(reservation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.reservationId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  Reservation.findByIdAndRemove(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.reservationId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.reservationId,
      });
    });
};
