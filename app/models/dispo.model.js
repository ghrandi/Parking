const mongoose = require("mongoose");

const DispoSchema = mongoose.Schema(
  {
	  nombre:String,
   idpark:String,
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dispo", DispoSchema);
