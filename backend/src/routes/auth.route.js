import express from 'express';
import passport from 'passport';  // Import passport
import { checkAuth, login, logout, signup, updateProfile, requestPasswordReset, resetPassword, verifyEmailSignup, getToken, checkGoogleUser } from '../controllers/auth.controllers.js';
import { generateToken } from '../lib/utils.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// User authentication routes
router.post('/signup', signup);
router.post('/verify-email', verifyEmailSignup);
router.post('/login', login);
router.post('/token',getToken);
router.post('/logout', logout);
router.post('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkAuth);
//route to get google user data
router.post('/get', checkGoogleUser)
// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log("Authenticated user:", req.user); // ✅ Debugging
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    
    // ✅ Store JWT in a cookie (best practice)
    generateToken(req.user._id, res);
    // // ✅ Send user data to frontend
    // res.json({
    //   _id: req.user._id,
    //   username: req.user.username,
    //   email: req.user.email,
    //   profilePic: req.user.profilePic,
    //   verified: req.user.verified,
    //   authProvider: req.user.authProvider, // Optional for tracking auth method
    // });
    

    res.redirect('http://localhost:5173'); // Redirect user to frontend
  }
);
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//      // ✅ Send a secure cookie
//      res.cookie("token", req.user._id, {
//       httpOnly: true,   // Prevents XSS attacks
//       secure: true,     // Set to true in production (requires HTTPS)
//       sameSite: "Lax",  // Helps with CSRF protection
//     });
//     res.redirect('http://localhost:5173'); // Redirect user to frontend
//   }
// );



// Password reset routes
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
