const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/auth/google/login",
  passport.authenticate("google-login", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/login/callback",
  passport.authenticate("google-login", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=not_registered`,
  }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.ENV !== "DEV",
      sameSite: process.env.ENV === "DEV" ? "Lax" : "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/login-success`);
  }
);


router.get(
  "/auth/google/register",
  passport.authenticate("google-register", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/register/callback",
  passport.authenticate("google-register", {
    session: false,
    failureRedirect: "/register",
  }),
  async (req, res) => {
    const { email, name, picture } = req.user.accountData;
    return res.redirect(
      `${process.env.FRONTEND_URL}/register?google=true&email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`
    );
  }
);

module.exports = router;
