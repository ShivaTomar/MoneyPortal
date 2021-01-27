const mongoose = require("mongoose");
//const validator = require("validator");

const BankAccount_Schema = new mongoose.Schema({
  /*--The account name.--*/
  name: {
    type: String,
    required: true,
  },

  /*--The bank account type.--*/
  accountType: {
    type: String,
    required: true
  },

  /*--The starting balance of the account. Will also be set as current balance.--*/
  CurrentBalance: {
    type: Number,
    required: true,
  },

  /*--The low balance alert threshold.--*/
  LowBalance: {
    type: Number,
    required: true,
  },

  /*--The email of the user the account is being added to.--*/
  email: {
    type: String,
    required: true,
  },

  /*--Household Id to which the bank account belongs to.--*/
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
  },
});

const BankAccount = new mongoose.model('BankAccount', BankAccount_Schema);
module.exports = BankAccount;