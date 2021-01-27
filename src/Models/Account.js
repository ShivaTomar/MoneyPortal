const mongoose = require("mongoose");

const UserAccount_schema = new mongoose.Schema( {
  /*--email of the user to which this account belongs--*/
  email: {
    type: String,
  },

  /*--role of the user account--*/
  role: {
    type: String,
    default: "Personal",
  },

  /*--Unique Id of the Household--*/
  HouseholdId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  /*--First name of the user--*/
  FirstName: {
    type: String
  },

  /*--Last name of the user--*/
  LastName: {
    type: String
  }
});

const user = new  mongoose.model("Account", UserAccount_schema);
module.exports = user;