const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helpers = require('../lib/helper');


module.exports = {
  signup: async (req, res) => {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const newUser = new User({
        username, password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
         // Compare the entered password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch) {
        const token = helpers.generateAccessToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }

     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
