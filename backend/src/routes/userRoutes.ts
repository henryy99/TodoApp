import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
    // login successful
    res.redirect(`${process.env.FRONT_END_URL}`); // redirect to frontend page
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json({
      success: true,
      user: req.user, // contains user info from MongoDB
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Not logged in",
    });
  }
});
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({ success: false, message: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out" });
    });
  });
});

export default router;
// Sample in-memory tasks array
