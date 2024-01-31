const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
const isActiveRoute = (route, currentRoute) => route === currentRoute ? 'active' : '';
module.exports = { connectDB, isActiveRoute };
