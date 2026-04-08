const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('🧪 Testing MongoDB Atlas connection...');
  console.log('📝 Connection string exists:', !!process.env.MONGO_URI);
  
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env file');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📊 Connected to: ${mongoose.connection.host}`);
    console.log(`💾 Database: ${mongoose.connection.name}`);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔧 Fix: Check your username and password in MONGO_URI');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Fix: Check your cluster name and internet connection');
    } else if (error.message.includes('timed out')) {
      console.log('\n🔧 Fix: Check IP whitelist in MongoDB Atlas Network Access');
    }
  }
};

testConnection();