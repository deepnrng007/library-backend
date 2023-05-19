const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  date_of_birth: String,
  age: Number,
  country: String,
  phone: String,
});

module.exports = mongoose.model("users", userSchema);
