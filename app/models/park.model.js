const mongoose = require("mongoose");

const ParkSchema = mongoose.Schema(
  {
	  nom:String,
   emplacement:String,
    capacite: String,
    
	tarif: String,
	dispo:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Park", ParkSchema);
