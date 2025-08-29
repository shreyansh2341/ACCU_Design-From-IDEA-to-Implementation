const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const createAuthTokenAndSaveCookies = async (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', 
    });
    res.cookie('jwt', token, {
        httpOnly: true, 
        secure: false,       
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    await User.findByIdAndUpdate(userId, { token });
    return token;
}

module.exports = createAuthTokenAndSaveCookies;