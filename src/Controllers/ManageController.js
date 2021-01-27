const BankAccountModel = require("../Models/BankAccount");
const AccountModel = require("../Models/Account");
let dummyEmail = "Shivutomar790@gmail.com"


/*returns current user profile--*/
exports.UserProfile = async (req, res) => {
  try {

    const user = await AccountModel.find({ "email": dummyEmail });
    const accounts = await BankAccountModel.find({ "email": dummyEmail });

    res.status(200).render("./Manage/UserProfile", {
      role: user[0].role,
      title: "MyProfile",
      accounts,
    })
  } catch (error) {
    res.status(400).send(error.message);
  }
}