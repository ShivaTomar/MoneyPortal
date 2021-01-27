/*--returns calculated account statistics--*/
function AccountStatistics(account) {

  let Spending = 0, Deposits = 0, Transactions = 0;

  for (let transaction of account) {
    if (transaction.TransactionType != 'Deposit' && transaction.TransactionType != 'Transfer') {
      Spending += transaction.Amount;
    }
    else if (transaction.TransactionType == 'Deposit') {
      Deposits += transaction.Amount;
    }
    Transactions++;
  }
  return { Deposits, Spending, Transactions }
}

module.exports = { AccountStatistics };
