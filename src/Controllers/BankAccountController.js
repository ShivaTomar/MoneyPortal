const AccountModel = require("../Models/Account");
const BankAccountModel = require("../Models/BankAccount");
const TransactionModel = require("../Models/Transaction");
const BankAccountViewModel = require('../ViewModels/BankAccountsViewModels');

/*--testing the application using a demo user for now--*/
var demo_user = process.env.DEMOUSER_EMAIL;

/*---Adds a Bank Account to a user with their Email.---*/
exports.AddBankAccount = async (req, res) => {

  let user = await AccountModel.find({ "email": demo_user });

  const accountData = {
    email: demo_user,
    name: req.body.name,
    accountType: req.body.accountType,
    CurrentBalance: req.body.CurrentBalance,
    LowBalance: req.body.LowBalance,
    FirstName: user[0].FirstName,
    LastName: user[0].LastName
  }

  try {
    const Account = new BankAccountModel(accountData);
    await Account.save();
    res.redirect("back");
  }
  catch (error) { res.status(400).send(error.message); }
}

/*---Returns all Bank Accounts---*/
exports.AllAccount = async (req, res) => {
  try {
    const AllAccounts = await BankAccountModel.find();
    res.send(AllAccounts);
  } catch (error) {
    res.status(200).send(error.message);
  }
}

/*---Get details of a bank account---*/
exports.AccountDetails = async (req, res) => {
  var _accountId = req.query.accountId; //get requested bank accountId

  try {

    const user = await AccountModel.find({ "email": demo_user });
    const accounts = await BankAccountModel.find({ "email": demo_user });
    const AccountDetails = await BankAccountModel.findById(_accountId);
    const TransactionDetails = await TransactionModel.find({ "BankAccountId": _accountId });
    const AccountStaistics = BankAccountViewModel.AccountStatistics(TransactionDetails);

    res.status(201).render("./BankAccounts/AccountDetails", {
      title: `${AccountDetails.name} - ${AccountDetails.accountType} `,
      role: user[0].role,
      accounts, AccountDetails, TransactionDetails, AccountStaistics,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*---Delete a bank account---*/
exports.DeleteBankAccount = async (req, res) => {
  try {

    await BankAccountModel.findOneAndDelete({ "_id": req.params.accountId });
    await TransactionModel.deleteMany({ "BankAccountId": req.params.accountId });

    res.status(200).redirect("/Dashboard/Main");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*---Edit a bank account---*/
exports.EditAccount = async (req, res) => {
  try {
    const updates = {
      name: req.body.bankAccountName,
      accountType: req.body.Types,
      LowBalance: req.body.lowBalance
    }

    await BankAccountModel.findByIdAndUpdate(req.params.accountId, updates);
    res.status(200).redirect("back");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*--returns bank account statistics--*/
exports.AccountStatistics = async (req, res) => {
  var accountId = req.params.accountId;

  try {

    const AccountDetails = await BankAccountModel.findById(accountId);
    const transactionDetails = await TransactionModel.find({ "BankAccountId": accountId });
    const AccountStaistics = BankAccountViewModel.AccountStatistics(transactionDetails);

    res.status(200).render("./BankAccounts/_AccountStatistics", {
      AccountDetails, AccountStaistics,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*--returns bank account transactions--*/
exports.AccountTransactions = async (req, res) => {
  try {

    const TransactionDetails = await TransactionModel.find({ "BankAccountId": req.params.accountId });
    res.status(200).render("./BankAccounts/_Transactions", { TransactionDetails });
  } 
  catch (error) {
    res.status(400).send(error.message);
  }
}
