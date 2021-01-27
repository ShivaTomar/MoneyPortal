const router = require("express").Router();
const BankAccountControllers = require("../Controllers/BankAccountController");

/*--Add bank account--*/
router.post("/AddAccount", BankAccountControllers.AddBankAccount);

/*Get all bank accounts--*/
router.get("/All", BankAccountControllers.AllAccount);

const AccountRouters = { router}
module.exports = AccountRouters;