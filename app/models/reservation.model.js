const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema(
  {
	  idpark:String,
	  emplacement:String,
   date:String,
    temps: String,
	numplace:String,
    
	
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
