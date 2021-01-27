const mongoose = require("mongoose");

const Budget_Schema = new mongoose.Schema({

  /*--Name of the budget category--*/
  name: {
    type: String
  },

  /*--Description of the created budget--*/
  description: {
    type: String
  },

  /*--Amount of the set budget--*/
  budgetAmount: {
    type: Number
  },

  /*--HouseholdId to which Budget belongs to--*/
  HouseholdId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  /*--Budget items--*/
  budgetItems: {
    type: mongoose.Schema.Types.Array,
  },
});

const Budget = new mongoose.model('Budget', Budget_Schema);
module.exports = Budget;