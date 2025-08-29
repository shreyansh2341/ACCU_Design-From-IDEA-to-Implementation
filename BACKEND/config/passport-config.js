const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user.model");

// GOOGLE LOGIN
passport.use(
  "google-login",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          // Return a specific error object rather than 'false'
          return done(null, false, { message: "User not registered" });
        }

        if (!user.isEmailVerified) {
          // Optional: block login if email not verified
          return done(null, false, { message: "Email not verified" });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// GOOGLE REGISTER
passport.use(
  "google-register",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REGISTER_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Just extract info for your frontend or registration flow
        const accountData = {
          email: profile.emails[0].value,
          name: profile.displayName,
          picture: profile.photos[0].value,
        };
        return done(null, { isPreRegister: true, accountData });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
