const router = require("express").Router();
const chartController = require("../Controllers/ChartController");

/*--Creates BudgetBars for household--*/
router.post('/BudgetsBar', chartController.get_BudgetChart);
/*--Creates Budget Breakdown for household-*/
router.post('/BudgetsBreakdownPie', chartController.get_BreakdownChart);

const chartRouter = { router };
module.exports = chartRouter;