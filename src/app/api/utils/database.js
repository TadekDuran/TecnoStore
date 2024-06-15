import mongoose from "mongoose";

const conn = {
  isConnected: false
}

export async function connectDB() {
  if (conn.isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    conn.isConnected = db.mongoose.connections[0].readyState;
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
