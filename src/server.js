require('dotenv').config();

const app = require('./app');           // or './src/app'
const connectDB = require('./config/db'); // or './src/config/db'

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running");
});