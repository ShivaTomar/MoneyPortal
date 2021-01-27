const router = require("express").Router();
const DashboardController = require("../Controllers/DashboardController")

/*--Get Lobby view--*/
router.get("/Main", DashboardController.getLobby);

/*--Get the Household view--*/
router.get("/Household", DashboardController.getHousehold);

const DashboardRouters = { router }
module.exports = DashboardRouters;