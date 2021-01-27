const path = require("path");

const partialsPath = path.join(__dirname, "./views/Partials");
const DashboardPartials = path.join(__dirname, "./views/Dashboard");
const BankAccountPartials = path.join(__dirname, "./views/BankAccounts");
const contentPath = path.join(__dirname, "/Content");
const scriptPath = path.join(__dirname, "/Scripts");
const viewsPath = path.join(__dirname, "/views");

const PathConfigures = { partialsPath, DashboardPartials, contentPath, scriptPath, viewsPath, BankAccountPartials };
module.exports = PathConfigures;