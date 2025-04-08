import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashedToken };
};

export const generatePasswordResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_RESET_SECRET, { expiresIn: "1h" });
};

export const generateAuthToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
