import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.json({ success: false, message: "User not authenticated" });

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
        req.userId = tokenDecoded.id;
    }
    else return res.json({ success: false, message: "User not authenticated" });

    next();
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export default userAuth;