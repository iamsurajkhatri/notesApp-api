const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
console.log(process.env.MONGODB_URI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
   
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;

