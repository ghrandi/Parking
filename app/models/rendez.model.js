const mongoose = require("mongoose");

const RendezSchema = mongoose.Schema(
  {
	  type:String,
   idpark:String,
   useremail:String,
   date:String,
   temps:String,
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rendez", RendezSchema);
