const handleBars = require("hbs");
const path = require(__dirname + "/path.config");

function _setApp(app) {
  app.set("views", path.viewsPath);
  app.set("view engine", "hbs");
}

function _Register_HbsPartials() {
  handleBars.registerPartials(path.partialsPath);
  handleBars.registerPartials(path.DashboardPartials);
  handleBars.registerPartials(path.BankAccountPartials);
}

/*--handleBars Helper method--*/
function _HbsRegisterHelpers() {
  handleBars.registerHelper('checkType', (a, b, opts) => {
    return a == b ? opts.fn(this) : opts.inverse(this);
  });

  handleBars.registerHelper('checkTransactionType', (type) => {
    let textColor = 'text-amount-';
    return textColor = type != 'Deposit' && type != 'Transfer' ? textColor.concat('red') : type == 'Deposit' ? textColor.concat('green') : textColor.concat('yellow');
  });

  handleBars.registerHelper('IsTransfer', (type, amount) => {
    return type == 'Transfer' ? `($${amount}.00)` : `$${amount}.00`;
  })

  handleBars.registerHelper('IsWithdrawal', (type, opts) => {
    return type != 'Deposit' && type != 'Transfer' ? opts.fn(this) : opts.inverse(this);
  })

  handleBars.registerHelper('IsInRole', (role) => {
    return role == 'Owner' || role == 'Member';
  });

  handleBars.registerHelper('AreAllLinked', (Total, Linked) => {
    return Total != Linked;
  });

  handleBars.registerHelper('IsBankOwner', (accountEmail, OwnerEmail) => {
    return accountEmail == OwnerEmail;
  });

  handleBars.registerHelper('IsEmptyItem', (Items) => {
    return Items.length != 0;
  })

  handleBars.registerHelper('Generate_BudgetTotal', (Budgets) => {
    let TotalBudget = 0;
    Budgets.forEach(Budget => {
      TotalBudget += Budget.budgetAmount;
    });
    return CommaFormatted(TotalBudget);
  })

  handleBars.registerHelper('selectBudgetItem', (CategoryId, ItemId) => {
    return CategoryId == null ? false : CategoryId.toString() == ItemId.toString();
  })

  handleBars.registerHelper('IsBudgetNull', (size) => {
    return size > 0;
  })
}

function CommaFormatted(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function main(app) {
  _setApp(app);
  _Register_HbsPartials();
  _HbsRegisterHelpers();
}

module.exports = {
  runHandlebarConfig: function (app) {
    main(app);
  }
}
