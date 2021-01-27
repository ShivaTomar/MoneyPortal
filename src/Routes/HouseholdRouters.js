const router = require("express").Router();
const HouseholdController = require("../Controllers/HouseholdController");

/*--Create Household--*/
router.post("/Create", HouseholdController.Create_Household);

/*--Delete Household--*/
router.get("/Delete", HouseholdController.Delete_HouseHold);

/*--Join Bank-Accounts to the Household--*/
router.post("/JoinBankAccount", HouseholdController.Join_BankAccount);

/*--returns Household-stats--*/
router.get("/HouseholdStatistics", HouseholdController.Household_Statistics);

/*--Get all Bank-Account belongs to the Household--*/
router.get("/BankAccounts", HouseholdController.Bank_Accounts);

/*--Remove a Bank-Account from the Household--*/
router.post("/RemoveBankAccount", HouseholdController.Remove_BankAccount);

/*--Get all the Members belongs to the Household--*/
router.get("/Members", HouseholdController.get_Members);

/*--Get list of all the Transactions from the Joined Account--*/
router.get("/Transactions", HouseholdController.get_Transactions);

const HouseRouter = { router };
module.exports = HouseRouter;