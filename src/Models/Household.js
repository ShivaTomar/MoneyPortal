const mongoose = require("mongoose");

const Household_schema = new mongoose.Schema( {
  /*--The name for the household.--*/
  name: {
    type: String
  },
  
  /*--The greeting of the household.--*/
  greeting: {
    type: String
  },

  /*--The email to set the owner of the household.--*/
  email: {
    type: String,
    unique: true
  }
});

const Household = new mongoose.model('Household', Household_schema);
module.exports = Household;