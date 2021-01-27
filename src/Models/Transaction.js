const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  /*--The Id of the bank account recieving transaction.--*/
  BankAccountId: {
    type: String,
  },

  /*--The Id of the transaction type.--*/
  TransactionType: {
    type: String,
    required: false
  },

  /*--Id of category item being assigned to transaction.--*/
  CategoryItemId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    required: false
  },

  /*--Id of category being assigned to transaction.--*/
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    required: false
  },

  /*--Amount of the transaction.--*/
  Amount: {
    type: Number,
    required: false
  },

  /*--Details about the transaction.--*/
  Memo: {
    type: String,
  },

  /*The Date on which transaction is created--*/
  Created: {
    type: Object,
  },
});

const Transcation = new mongoose.model('Transactions', TransactionSchema);
module.exports = Transcation;