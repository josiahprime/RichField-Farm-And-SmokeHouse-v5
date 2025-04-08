import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import rateLimit from "express-rate-limit";
import Joi from "joi";
import winston from "winston";
import dotenv from "dotenv";

import { OAuth2Client } from "google-auth-library"; 

import { generateVerificationToken, generatePasswordResetToken, generateAuthToken } from "../lib/token.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../lib/email.js";
import { hashPassword, comparePasswords } from "../lib/password.js";
import logger from "../lib/logger.js";
import checkUserCount from "../lib/checkUserCount.js";


dotenv.config();


// === Joi Schemas ===
const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(8).max(64).required(),
  token: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  profilePic: Joi.string().uri().required(),
});

// === Rate Limiters ===
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many signup attempts. Please try again later.",
});

export const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many password reset attempts. Please try again later.",
});


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Generate JWT Token
const generateGoogleToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// === Controllers ===


export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = signupSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(400).json({ message: 'User already exists and is verified.' });
      }

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      if (existingUser.verificationTokenCreatedAt > oneDayAgo) {
        return res.status(400).json({
          message: 'Verification email was already sent recently. Please check your inbox.',
        });
      }

      // 🔹 Generate a JWT token instead of a random string
      const verificationToken = jwt.sign(
        { email: existingUser.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );

      existingUser.verificationToken = verificationToken;
      existingUser.verificationTokenCreatedAt = new Date();
      existingUser.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await existingUser.save();

      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?emailToken=${verificationToken}`;
      
      await sendVerificationEmail(existingUser.email, verificationLink);

      return res.status(200).json({
        message: 'Account is unverified. A new verification email has been sent.',
      });
    }

    const hashedPassword = await hashPassword(password);

    // 🔹 Generate JWT verification token for the new user
    const verificationToken = jwt.sign(
      { email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    const userCount = checkUserCount()

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userCount === 0 ? 'admin' : 'customer', // First user becomes admin
      verified: false,
      verificationToken,
      verificationTokenCreatedAt: new Date(),
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      authProvider: 'local'
    });

    await newUser.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?emailToken=${verificationToken}`;
    console.log(verificationLink)
    await sendVerificationEmail(newUser.email, verificationLink);

    res.status(201).json({
      message: 'User registered successfully. A verification email has been sent.',
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};



export const verifyEmailSignup = async (req, res) => {
  console.log('we reached verifyEmail');
  const { emailToken } = req.body;
  console.log(emailToken)
  if (!emailToken) {
    return res.status(400).json({ message: 'Verification token is required.' });
  }

  try {
    // ✅ Decode JWT token
    const decoded = jwt.verify(emailToken, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    let user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    if (user.verified) {
      return res.status(200).json({ 
        message: 'Your email has already been verified. You can log in now.', 
        success: true 
      });
    }

    // ✅ Mark user as verified
    
    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenCreatedAt = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully!", success: true });

  } catch (error) {
    console.error('Email Verification Error:', error);
    res.status(400).json({ message: 'Invalid or expired verification token.' });
  }
};







export const login = async (req, res) => {
  console.log('we reached login route')
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    generateToken(user._id, res);

    logger.info(`User ${user.email} logged in successfully.`);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      verified: user.verified,
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const checkGoogleUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    profilePic: req.user.profilePic,
    verified: req.user.verified,
    authProvider: req.user.authProvider,
  });
}


const generateOAuthToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// OAuth Login Function
export const oauthLogin = async (req, res) => {
  try {
    const { token } = req.body; // OAuth token from client (Google, GitHub, etc.)

    // Verify Google OAuth token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user
      user = await User.create({
        username: name,
        email,
        profilePic: picture,
        authProvider: "google",
      });
    }

    // If the user already exists → Just generate JWT
    const jwtToken = generateOAuthToken(user);

    res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    console.error("OAuth login error:", error);
    res.status(500).json({ message: "OAuth login failed", error });
  }
};





// **4. Set Password for Google Users**
export const setPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    user.authProvider = "local";
    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error setting password", error });
  }
};


export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    logger.info("User logged out successfully.");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const { error } = updateProfileSchema.validate({ profilePic });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).lean();

    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "If your email exists, a reset link will be sent." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);

    user.resetToken = hashedToken;
    await user.save();

    // IMPORTANT: Sign a JWT that includes the plain resetToken
    const token = jwt.sign(
      { userId: user._id, resetToken },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "1h" }
    );

    // Build the reset link using the JWT
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // ❌ ISSUE: You previously called sendPasswordResetEmail(user, user.resetToken)
    // **Fix:** Use the reset link:
    await sendPasswordResetEmail(user, resetLink);

    logger.info(`Password reset link sent to ${email}`);
    res.status(200).json({ message: "If your email exists, a reset link will be sent." });
  } catch (error) {
    logger.error("Password reset request error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
    // Validate Input
    const { error } = resetPasswordSchema.validate({ newPassword, email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    if (!decoded || Date.now() >= decoded.exp * 1000) {
      return res.status(400).json({ message: "Reset token has expired." });
    }

    const user = await User.findById(decoded.userId);

    if (!user || !user.resetToken) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const isTokenValid = await comparePasswords(decoded.resetToken, user.resetToken);
    if (!isTokenValid) return res.status(400).json({ message: "Invalid request" });

    user.password = await hashPassword(newPassword)
    user.resetToken = null;
    await user.save();

    logger.info(`Password reset successful for userId: ${user._id}`);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    logger.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid request" });
  }
};






// ✅ Check Auth
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    logger.error("Check auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Protected Route to Get JWT After Login
export const getToken = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token });
}

