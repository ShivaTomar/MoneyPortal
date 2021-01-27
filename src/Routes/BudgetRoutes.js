const router = require("express").Router();
const BudgetController = require("../Controllers/BudgetController");

/*--Create budget for Household--*/
router.post("/CreateBudget", BudgetController.Create_Budget);

/*--Create a buget-item for the budget category--*/
router.post("/CreateBudgetItem", BudgetController.Create_BudgetItem);

/*--Get budget-list for Household budget--*/
router.get("/BudgetList", BudgetController.Budget_List);

/*--Remove a budget item from the budget category--*/
router.post("/RemoveItem", BudgetController.Remove_Item);

/*--Update Budget Item--*/
router.post("/UpdateBudgetItem", BudgetController.update_BudgetItem);

const BudgetRouter = { router };
module.exports = BudgetRouter;