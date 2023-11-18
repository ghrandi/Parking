const Reclamation = require('../models/reclamation.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.contenu) {
        return res.status(400).send({
            message: "commentaire content can not be empty"
        });
    }

    // Create a commentaire
    const reclamation = new Reclamation({
        contenu: req.body.contenu || "Untitled commentaire",
        iduser: req.body.iduser,
		emailuser:req.body.emailuser,
		
		
        
    });

    // Save commentaire in the database
    reclamation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the commentaire."
        });
    });
};

// Retrieve and return all commentaire from the database.
exports.findAll = (req, res) => {
    Reclamation.find()
    .then(reclamations => {
        res.send(reclamations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving commentaire."
        });
    });
};

// Find a single commentaire with a adminId
exports.findOne = (req, res) => {
    Reclamation.findById(req.params.reclamationId)
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "commentaire not found with id " + req.params.reclamationId
            });            
        }
        res.send(reclamation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "commentaire not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.reclamationId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.contenu) {
        return res.status(400).send({
            message: "commentaire content can not be empty"
        });
    }

    // Find admin and update it with the request body
   Reclamation.findByIdAndUpdate(req.params.reclamationId, {
        contenu: req.body.contenu || "Untitled commentaire", 
        empolyé : req.body.empolyé
		
    }, {new: true})
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "commentaire not found with id " + req.params.reclamationId
            });
        }
        res.send(reclamation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.reclamationId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Reclamation.findByIdAndRemove(req.params.reclamationId)
    .then(reclamation => {
        if(!reclamation) {
            return res.status(404).send({
                message: "commentaire not found with id " + req.params.reclamationId
            });
        }
        res.send({message: "commentaire deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "commentaire not found with id " + req.params.reclamationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete commentaire with id " + req.params.reclamationId
        });
    });
};
