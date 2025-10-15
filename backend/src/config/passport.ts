import passport from "passport";
import dotenv from "dotenv";
import User, { type IUser } from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALL_BACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Find or create user in db
        const email = profile.emails?.[0]?.value;

        let user = (await User.findOne({ email })) as IUser;

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            photo: profile.photos?.[0]?.value,
          });
        }
        return done(null, user);
      } catch (error) {
        console.error("Google authentication error", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
