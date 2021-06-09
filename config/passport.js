const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

exports.googleConfig = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const userData = await User.findOne({ id: profile.id });

          if (!userData) {
            const newUser = {
              id: profile.id,
              username: `${profile.displayName}`,
              password: null,
              image: profile.photos[0].value,
              registerMethod: "Google",
            };
            // Create new user
            let savedUser = new User(newUser);
            savedUser = await savedUser.save();

            const refToken = jwt.sign(
              { _id: savedUser._id },
              process.env.SECRET
            );
            cb(null, refToken);
          } else {
            const refToken = jwt.sign(
              { _id: userData._id },
              process.env.SECRET
            );
            cb(null, refToken);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};

exports.twitterConfig = (passport) => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const userData = await User.findOne({ id: profile.id });

          if (!userData) {
            const newUser = {
              id: profile.id,
              username: `${profile.displayName}`,
              password: null,
              image: profile.photos[0].value,
              registerMethod: "Twitter",
            };
            // Create new user
            let savedUser = new User(newUser);
            savedUser = await savedUser.save();

            const refToken = jwt.sign(
              { _id: savedUser._id },
              process.env.SECRET
            );
            cb(null, refToken);
          } else {
            const refToken = jwt.sign(
              { _id: userData._id },
              process.env.SECRET
            );
            cb(null, refToken);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
