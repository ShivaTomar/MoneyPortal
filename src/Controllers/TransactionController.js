const TransactionModel = require("../Models/Transaction");
const BankAccountModel = require("../Models/BankAccount");
const TransactionViewModel = require("../ViewModels/TransactionViewModel");
const moment = require("moment");

let dummyEmail = "Shivutomar790@gmail.com";

/*--Adds a transaction to a bank account--*/
exports.AddTransaction = async (req, res) => {

  /*-create date and time for transaction which is being added-*/
  let now = moment();
  let createMoment = TransactionViewModel.getDate(now);

  try {
    const transactionDetails = {
      BankAccountId: req.params.accountId,
      Amount: req.body.Amount,
      TransactionType: req.body.TransactionType,
      Memo: req.body.Memo,
      Created: { createMoment },
    }

    const accountDetails = await BankAccountModel.findById(req.params.accountId);

    let cur_Balance = accountDetails.CurrentBalance;
    let new_Balance = TransactionViewModel.TransactionStatistics(transactionDetails, cur_Balance, true);

    await BankAccountModel.findByIdAndUpdate(req.params.accountId, { "CurrentBalance": new_Balance });
    const Transaction = new TransactionModel(transactionDetails);
    await Transaction.save();
    res.status(200).send(true);
  }
  catch (error) { res.status(400).send(error.message) }
}

/*--Deletes a transaction to a bank account--*/
exports.DeleteTransaction = async (req, res) => {
  try {

    const accountDetails = await BankAccountModel.findById(req.body.accountId);
    const transactionDetails = await TransactionModel.findById(req.body.transactionId);

    let cur_Balance = accountDetails.CurrentBalance;
    let new_Balance = TransactionViewModel.TransactionStatistics(transactionDetails, cur_Balance, false);

    await TransactionModel.findOneAndDelete({ "_id": req.body.transactionId });
    await BankAccountModel.findByIdAndUpdate(req.body.accountId, { "CurrentBalance": new_Balance });
    res.status(200).send(true);
  }
  catch (error) { 
    console.log(error.message)
    res.status(400).send(error.message);
   }
}

