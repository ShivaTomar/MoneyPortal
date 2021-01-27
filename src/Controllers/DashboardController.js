const BankAccount = require("../Models/BankAccount");
const AccountModel = require("../Models/Account");
const HouseholdModel = require("../Models/Household");
const TranscationModel = require("../Models/Transaction");
const BankAccountsViewModel = require("../ViewModels/BankAccountsViewModels");
const BudgetModel = require("../Models/Budget");

/*--testing the application using a demo user for now--*/
var demo_user = process.env.DEMOUSER_EMAIL;

/*---returns lobby view---*/
exports.getLobby = async (req, res) => {

  try {

    /*-get Info of current user "filtered with user email."-*/
    let user = await AccountModel.find({ "email": demo_user });

    /*-redirect to Household View if user is in role of a "Member" or "Owner".-*/
    if (user[0].role == 'Owner' || user[0].role == 'Member') {
      res.status(200).redirect('/Dashboard/Household');
      return;
    }

    /*-get account data "filtered with user email".-*/
    let accounts = await BankAccount.find({ "email": demo_user });

    res.status(200).render("./Main/Layout", {
      title: "Lobby",
      role: "Personal", accounts
    });
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

/*---returns view for the household---*/
exports.getHousehold = async (req, res) => {

  try {

    /*-get Info of current user "filtered with user email".-*/
    let user = await AccountModel.find({ "email": demo_user });

    /*-redirect to Lobby View if user is in role of "Personal".-*/
    if (user[0].role == 'Personal') {
      res.status(200).redirect('/Dashboard/Main');
      return;
    }

    /*-get household data "filtered with user Household-Id".-*/
    let houseData = await HouseholdModel.findById(user[0].HouseholdId);

    /*-get account data "filtered with user email".-*/
    let accounts = await BankAccount.find({ "email": demo_user });

    /*--get accounts which belongs to the users household--*/
    let HouseAccounts = await BankAccount.find({ "email": demo_user, "HouseholdId": null });

    let linkedAccounts = await BankAccount.find({ "email": demo_user, "HouseholdId": user[0].HouseholdId });

    let HouseStats = { TotalBalance: 0, TotalBudget: 0, MonthlySpending: 0, MonthlyDeposit: 0 };

    for (let account of linkedAccounts) {
      HouseStats.TotalBalance += account.CurrentBalance;
      let transactionDetails = await TranscationModel.find({ "BankAccountId": account._id });

      if (transactionDetails != null) {
        let stats = BankAccountsViewModel.AccountStatistics(transactionDetails);
        HouseStats.MonthlySpending += stats.Spending;
        HouseStats.MonthlyDeposit += stats.Deposits;
      }
    }

    const Budgets = await BudgetModel.find({ "HouseholdId": user[0].HouseholdId });

    let TotalBudget = 0, BudgetItems = 0;
    Budgets.forEach(Budget => {
      TotalBudget += Budget.budgetAmount;
      BudgetItems += Budget.budgetItems.length;
    });
    
    res.status(200).render("./Main/Layout", {
      title: houseData.name,
      role: user[0].role,
      accounts, HouseAccounts, HouseStats, Budgets, TotalBudget, BudgetItems,
      linkedCount: accounts.length - HouseAccounts.length,
      TotalCount: accounts.length,
    });
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}
