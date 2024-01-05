const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
module.exports = {  generateAccessToken };