/*--returns transaction stats--*/
function TransactionStatistics(transaction, Balance, IsAdd) {

  let Type = transaction.TransactionType;

  if (Iswithdrawal(Type)) {
    Balance = IsAdd == true ? Balance - transaction.Amount : Balance + transaction.Amount;
  }
  else if (IsDeposit(Type)) {
    Balance = IsAdd == true ? Balance + parseInt(transaction.Amount) : Balance - parseInt(transaction.Amount);
  }

  return Balance;
}

/*--returns true if transaction is type of withdrawal--*/
function Iswithdrawal(type) {
  return type != 'Deposit' && type != 'Transfer';
}

/*--returns true if transaction is type of deposit--*/
function IsDeposit(type) {
  return type == 'Deposit';
}

/*--returns data & time of current moment--*/
function getDate(now) {
  let date = now.format("dddd, MMMM Do YYYY"), time = now.format("h:mm a");
  return {date, time};
}

module.exports = { TransactionStatistics, getDate };