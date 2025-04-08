import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

// Initialize Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if an account already exists with this email
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            console.log("User already exists with this email:", user);
            return done(null, user); // Return existing user
          }

          // If no user exists, create a new Google user
          user = new User({
            googleId: profile.id,
            username: profile.displayName || profile.emails[0].value.split("@")[0],
            password: undefined, // No password for Google users
            role: 'customer',
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            verified: true,
            authProvider: 'google'
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
