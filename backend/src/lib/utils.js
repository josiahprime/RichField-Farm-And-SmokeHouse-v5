import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId: userId.toString() }, // ✅ Wrap in an object
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ Fix: Convert hours to seconds properly
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development' // ✅ Fix: Use correct casing for NODE_ENV
    });

    return token;
};
