const router = require("express").Router();
const ManageControllers = require("../Controllers/ManageController");

/*--Get user profile--*/
router.get("/UserProfile", ManageControllers.UserProfile);
  
const UserProfileRouters = {router};
module.exports = UserProfileRouters;