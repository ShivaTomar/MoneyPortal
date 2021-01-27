const BudgetModel = require("../Models/Budget");
const UserAccount = require("../Models/Account");
const TransactionModel = require("../Models/Transaction");
const mongoose = require("mongoose");

/*--testing the application using a demo user for now--*/
var demo_user = process.env.DEMOUSER_EMAIL;

/*--Create budget categories--*/
exports.Create_Budget = async (req, res) => {
  try {
    const user = await UserAccount.find({ "email": demo_user });
    const HouseholdId = user[0].HouseholdId;

    const BudgetData = {
      name: req.body.budgetName,
      description: req.body.budgetDescription,
      budgetAmount: req.body.Amount,
      HouseholdId
    }

    const Budget = new BudgetModel(BudgetData);
    await Budget.save();
    const Budgets = await BudgetModel.find({ HouseholdId });

    res.status(200).send(Budgets);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

/*--create a budget items--*/
exports.Create_BudgetItem = async (req, res) => {
  try {

    const ItemId = mongoose.Types.ObjectId();
    const BudgetCategoryId = req.body.Budgets;

    await BudgetModel.updateOne(
      { _id: BudgetCategoryId },
      { $push: { budgetItems: { ItemId, name: req.body.budgetItemName } } }
    );

    res.status(200).send(true);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

/*--Create budget-list--*/
exports.Budget_List = async (req, res) => {
  try {
    const user = await UserAccount.find({ "email": demo_user });
    const Budgets = await BudgetModel.find({ "HouseholdId": user[0].HouseholdId });

    res.status(200).render("./Budgets/_BudgetSelectBox", { Budgets });
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

/*--Remove an Item from the Budget Category--*/
exports.Remove_Item = async (req, res) => {

  try {
    const IDs = req.body.BudgetList.split(",");
    const BudgetId = IDs[0], BudgetItemId = IDs[1];
    const IsItemValid = IDs.length > 1;

    if (IsItemValid) {
      await BudgetModel.update(
        { _id: mongoose.Types.ObjectId(BudgetId) },
        { $pull: { budgetItems: { ItemId: mongoose.Types.ObjectId(BudgetItemId) } } },
      );
    }

    res.status(200).send(IsItemValid);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

/*--Assign a Budget Item to the Household transaction--*/
exports.update_BudgetItem = async (req, res) => {
  try {
    const IDs = req.body.budgetItemId.split(",");
    const BudgetId = IDs[0], ItemId = IDs[1];
    const updateBudget = IDs.length > 1 || { val: "reset" };

    if (updateBudget == true) {
      await TransactionModel.findByIdAndUpdate(req.body.transactionId, { "CategoryItemId": mongoose.Types.ObjectId(ItemId), "CategoryId": mongoose.Types.ObjectId(BudgetId) });
    }
    else {
      await TransactionModel.findByIdAndUpdate(req.body.transactionId, { "CategoryItemId": null, "CategoryId": null });
    }
    res.status(200).send(updateBudget);
  }
  catch (error) {
    res.status(400).send(error)
  }
}