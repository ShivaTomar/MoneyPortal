const TransactionModel = require("../Models/Transaction");
const BankAccountModel = require("../Models/BankAccount");


/*--returns transaction counts--*/
async function CountTransactions(JoinedAccounts) {
  try {
    let TransactionsCount = 0;
    for (let account of JoinedAccounts) {
      TransactionsCount += await TransactionModel.find({ "BankAccountId": account._id }).countDocuments();
    }
    return TransactionsCount;
  }
  catch (error) { console.log(error.message); }
}

/*--returns members data for household--*/
async function GetMemberData(Members) {
  try {
    let result = [];
    for (let member of Members) {
      const JoinedAccounts = await BankAccountModel.find({ "email": member.email, "HouseholdId": member.HouseholdId });
      const TransactionsCount = await CountTransactions(JoinedAccounts);

      const Id = member._id, JoinedAccountsCount = JoinedAccounts.length, FullName = `${member.FirstName} ${member.LastName}`;
      result.push({
        Id, 
        JoinedAccountsCount, 
        TransactionsCount, 
        FullName
      }) 
    }
    console.log(result);
    return result;
  }
  catch (error) { console.log(error.message); }
}

module.exports = { CountTransactions, GetMemberData };