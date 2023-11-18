const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    nom: String,
    tel: String,
 
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
