const router = require("express").Router();
const BankAccountControllers = require("../Controllers/BankAccountController");

/*--Delete bank account--*/
router.get("/Delete/:accountId", BankAccountControllers.DeleteBankAccount);

/*--Get account details--*/
router.get("/AccountDetails", BankAccountControllers.AccountDetails);

/*--Edit account details--*/
router.post("/Edit/:accountId", BankAccountControllers.EditAccount);

/*--Partial account statistics--*/
router.get("/AccountStatistics/:accountId", BankAccountControllers.AccountStatistics);

/*--Partial account transactions--*/
router.get("/AccountTransactions/:accountId", BankAccountControllers.AccountTransactions);

const BankAccountRouter = { router };
module.exports = BankAccountRouter;