import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env"
  );
}

const MONGODB_URI = process.env.DATABASE_URL;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      console.log("Connecting to MongoDB...");
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("MongoDB connected successfully!");
        return mongoose;
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      cached.promise = null;
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("Error establishing connection:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
