require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const path = require(__dirname + "/path.config");
const handleBars = require(__dirname + "/Handlebars.config");
require("./App_Start/_connection");

/*--Import all require APIs--*/
const DashboradAPI = require(__dirname + "/Routes/DashboardRoutes");
const UserProfileAPI = require(__dirname + "/Routes/UserProfileRoutes");
const BankAccountsAPI = require(__dirname + "/Routes/BankAccountsRoutes");
const TransactionAPI = require(__dirname + "/Routes/TransactionRoutes");
const HouseholdAPI = require(__dirname + "/Routes/HouseholdRouters");
const BudgetAPI = require(__dirname + "/Routes/BudgetRoutes");
const ChartAPI = require(__dirname + "/Routes/ChartRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

RunConfigurations();
handleBars.runHandlebarConfig(app);

app.listen(PORT, (res, req) => {
  console.log(`server is up and running at ${PORT}`);
});

/*--app configuration--*/
function _appConfig() {
  app.use(bodyParser.json());
  app.use(express.static(path.contentPath));
  app.use(express.static(path.scriptPath));
  app.use(bodyParser.urlencoded({ extended: true }));
}

/*--routers configuration--*/
function routersConfig() {
  app.use("/Dashboard", DashboradAPI.router);
  app.use("/Manage", UserProfileAPI.router);
  app.use("/BankAccounts", BankAccountsAPI.router);
  app.use("/Transactions", TransactionAPI.router);
  app.use("/Households", HouseholdAPI.router);
  app.use("/Budgets", BudgetAPI.router);
  app.use("/Charts", ChartAPI.router);
}

/*--Run all configurations--*/
function RunConfigurations() {
  _appConfig();
  routersConfig();
}