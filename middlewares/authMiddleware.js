const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const tokenValue = token.split(' ')[1];
  const secretKey = process.env.JWT_SECRET;
  jwt.verify(tokenValue, secretKey, (err, user) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        // Invalid token
        return res.status(401).json({ error: 'Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        // Token has expired
        return res.status(401).json({ error: 'Token has expired' });
      } else {
        // Other errors
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else {
      req.user = user;
      next();
    }
  });
};
