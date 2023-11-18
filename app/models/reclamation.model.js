const mongoose = require('mongoose');

const ReclamationSchema = mongoose.Schema({
    contenu: String,
    iduser:String,
emailuser:String,
           
    
            
	
    
	
	
	
}, {
    timestamps: true
});

module.exports = mongoose.model('reclamation', ReclamationSchema);