const router = require("express").Router();
const TransactionController = require("../Controllers/TransactionController");

/*--Add transaction to the bank account--*/
router.post("/AddTransaction/:accountId", TransactionController.AddTransaction);

/*--Delete transaction of the bank account--*/
router.post("/DeleteTransaction", TransactionController.DeleteTransaction);

const TransactionRouter = { router };
module.exports = TransactionRouter;