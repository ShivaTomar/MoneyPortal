const users = require("../Models/Account");
const BudgetModel = require("../Models/Budget");
const Transactions = require("../Models/Transaction");
const ChartViewModel = require("../ViewModels/ChartViewModel");

/*--testing the application using a demo user for now--*/
var demo_user = process.env.DEMOUSER_EMAIL;


/*--return the Budget chart for household--*/
exports.get_BudgetChart = async (req, res) => {
  try {

    const user = await users.find({ "email": demo_user });
    const Budgets = await BudgetModel.find({ "HouseholdId": user[0].HouseholdId });

    const Labels = [], Data = [];
    for (let budget of Budgets) {

      var BudgetSum = 0;
      let monthlyBudgetTransactions = await Transactions.find({ "CategoryId": budget._id });

      monthlyBudgetTransactions.forEach(transaction => {
        BudgetSum += transaction.Amount;
      });

      Labels.push(budget.name);
      Data.push(BudgetSum);
    }

    const responseData = { Labels, Data, Options: ChartViewModel.Options };
    res.status(200).send(responseData);

  } catch (error) {
    res.status(400).send(error);
  }
}

/*--returns Budgetbreakdown chart for selected budget category--*/
exports.get_BreakdownChart = async (req, res) => {
  try {

    const budgetId = req.body.budgetId;
    const budget = await BudgetModel.findById(budgetId);

    const Labels = [], Data = [];
    for (let item of budget.budgetItems) {

      var Itemsum = 0;
      let transactions = await Transactions.find({ "CategoryItemId": item.ItemId });

      transactions.forEach(transaction => {
        Itemsum += transaction.Amount;
      });

      Labels.push(item.name);
      Data.push(Itemsum);
    }

    const responseData = { Labels, Data, Options: ChartViewModel.Options };
    res.status(200).send(responseData);
  }
  catch (error) {
    res.status(400).send(error);
  }
}



