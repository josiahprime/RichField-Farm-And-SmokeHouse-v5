import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';  // Required for Passport sessions
import cors from 'cors';
import passport from 'passport';  // Import Passport
import './lib/passport.js'; // Ensure Passport strategies are loaded
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import payRoutes from './routes/pay.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
    cors({
      origin: 'http://localhost:5173', // Allow your frontend's origin
      credentials: true, // This is important for cookies/sessions!
    })
);

// **Session Middleware (needed for OAuth)**
app.use(
    session({
        secret: 'your_secret_key',  // Change this to a strong secret
        resave: false,
        saveUninitialized: false,
    })
);

// **Initialize Passport Middleware**
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
console.log("📢 Loading Pay Routes..."); // Log before mounting

app.use('/api/pay', (req, res, next) => {
    console.log(`📢 Request received at /api/pay: ${req.method} ${req.url}`);
    next();
}, payRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
