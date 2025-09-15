const SignupModel = require("../models/SignUp");


exports.getUserData = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId)
      return res.json({ success: false, message: "User not authenticated" });

    const user = await SignupModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      userData: {
        Username: user.Username,
        isAcountVerified: user.isAcountVerified,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
