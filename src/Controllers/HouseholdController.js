const HouseholdModel = require("../Models/Household");
const AccountModel = require("../Models/Account");
const BankAccountModel = require("../Models/BankAccount");
const BankAccountsViewModel = require("../ViewModels/BankAccountsViewModels");
const TranscationModel = require("../Models/Transaction");
const HouseholdViewModel = require("../ViewModels/HouseholdViewModel");
const BudgetModel = require("../Models/Budget");


/*--testing the application using a demo user for now--*/
var demo_user = process.env.DEMOUSER_EMAIL;

/*--Creates household on users request--*/
exports.Create_Household = async (req, res) => {

  const houseData = {
    name: req.body.HouseholdName,
    greeting: req.body.HouseholdGreeting,
    email: demo_user
  }

  try {
    const Household = new HouseholdModel(houseData);
    await Household.save();

    let HouseId = Household._id;
    await AccountModel.findOneAndUpdate({ 'email': demo_user }, { "role": "Owner", "HouseholdId": HouseId });
    res.status(200).redirect(`/Dashboard/Household`);

  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*--Deletes household on users request--*/
exports.Delete_HouseHold = async (req, res) => {

  try {

    const user = await AccountModel.find({ 'email': demo_user });

    await BankAccountModel.updateMany({ 'HouseholdId': user[0].HouseholdId }, { 'HouseholdId': null });
    await BudgetModel.deleteMany({ "HouseholdId": user[0].HouseholdId });
    await HouseholdModel.findByIdAndDelete(user[0].HouseholdId);
    await AccountModel.updateMany({ 'HouseholdId': user[0].HouseholdId }, { 'HouseholdId': null, 'role': "Personal" });

    res.status(200).redirect("/Dashboard/Main");

  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*--Joins bank account with the associated household--*/
exports.Join_BankAccount = async (req, res) => {
  try {

    const user = await AccountModel.find({ "email": demo_user });
    await BankAccountModel.findByIdAndUpdate(req.body.UsersBankAccounts, { 'HouseholdId': user[0].HouseholdId });
    const Household_bankAccounts = await BankAccountModel.find({ "email": demo_user, "HouseholdId": null });

    res.status(200).send(Household_bankAccounts);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*--returns household stats--*/
exports.Household_Statistics = async (req, res) => {
  try {

    const user = await AccountModel.find({ "email": demo_user });
    const JoinedAccounts = await BankAccountModel.find({ "email": demo_user, "HouseholdId": user[0].HouseholdId });

    let HouseStatistics = { TotalBalance: 0, TotalBudget: 0, MonthlySpending: 0, MonthlyDeposit: 0 };
    for (let account of JoinedAccounts) {

      HouseStatistics.TotalBalance += account.CurrentBalance; // Total Balance
      let transactionDetails = await TranscationModel.find({ "BankAccountId": account._id }); // Get transactions for this bank account

      if (transactionDetails != null) {
        let stats = BankAccountsViewModel.AccountStatistics(transactionDetails);
        HouseStatistics.MonthlySpending += stats.Spending; // Monthly Spending
        HouseStatistics.MonthlyDeposit += stats.Deposits; // Monthly Deposit
      }
    }

    let TotalBudget = 0;
    const Budgets = await BudgetModel.find({ "HouseholdId": user[0].HouseholdId });
    Budgets.forEach(Budget => { TotalBudget += Budget.budgetAmount });

    res.status(200).render("./Dashboard/_HouseholdStatistics", {
      HouseStats: HouseStatistics, TotalBudget
    })

  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*--returns all the bank account linked with the household--*/
exports.Bank_Accounts = async (req, res) => {
  try {

    const user = await AccountModel.find({ "email": demo_user });
    const BankAccounts = await BankAccountModel.find({ "HouseholdId": user[0].HouseholdId });
    const accounts = await BankAccountModel.find({ "email": demo_user });

    res.status(200).render("./Households/BankAccounts", {
      role: user[0].role,
      ownerEmail: user[0].email,
      title: "Household Bank Accounts",
      BankAccounts, accounts
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*--Removes a bank account from household--*/
exports.Remove_BankAccount = async (req, res) => {
  try {

    await BankAccountModel.findByIdAndUpdate(req.body.accountId, { 'HouseholdId': null });
    await TranscationModel.updateMany({ "BankAccountId": req.body.accountId }, { "CategoryItemId": null, "CategoryId": null });
    res.status(200).send(true);

  } catch (error) {
    console.log(error.message);
    res.status(400).send(false);
  }
}

/*--returns all the members of the household--*/
exports.get_Members = async (req, res) => {

  const user = await AccountModel.find({ "email": demo_user });
  const accounts = await BankAccountModel.find({ "email": demo_user });
  const owner = await AccountModel.find({ "HouseholdId": user[0].HouseholdId, role: "Owner" });
  const JoinedAccounts = await BankAccountModel.find({ "email": owner[0].email, "HouseholdId": user[0].HouseholdId });
  const TransactionsCount = await HouseholdViewModel.CountTransactions(JoinedAccounts);

  const Owner = {
    Id: owner[0]._id,
    FullName: `${owner[0].FirstName} ${owner[0].LastName}`,
    TransactionsCount,
    JoinedAccountsCount: JoinedAccounts.length
  }

  const HouseMember = await AccountModel.find({ "HouseholdId": user[0].HouseholdId, role: "Member" });
  const Members = await HouseholdViewModel.GetMemberData(HouseMember);

  res.status(200).render("./Households/Members", {
    title: "Household Members",
    role: user[0].role,
    Owner, Members, accounts,
  });
}

/*--returns spending type transaction of account linked with household--*/
exports.get_Transactions = async (req, res) => {

  try {
    const user = await AccountModel.find({ "email": demo_user });
    const accounts = await BankAccountModel.find({ "email": demo_user });
    const Budgets = await BudgetModel.find({ "HouseholdId": user[0].HouseholdId });
    
    const AllTransactions = [];
    const JoinedAccounts = await BankAccountModel.find({ "HouseholdId": user[0].HouseholdId });
    
    for (let account of JoinedAccounts) {
      let Transactions = await TranscationModel.find({ "BankAccountId": account._id });

      Transactions.forEach((transaction) => {
        if (transaction.TransactionType != "Deposit" && transaction.TransactionType != "Transfer") {
          transaction.OwnerName = `${account.FirstName} ${account.LastName}`;
          transaction.AccountName = account.name;
          AllTransactions.push(transaction);
        }
      })
    }

    res.status(200).render("./Households/Transactions", {
      title: "Household Transactions",
      role: "Owner",
      accounts, Budgets, AllTransactions, JoinedAccounts
    });
  } 
  catch (error) {
    res.status(400).send(error.message);
  }
}