exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({success: true, message: "Logged out successfully."})
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
