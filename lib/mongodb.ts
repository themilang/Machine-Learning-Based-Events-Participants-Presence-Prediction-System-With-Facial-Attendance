import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in .env.local");
}

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as unknown as { mongoose: MongooseGlobal };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const cached = globalWithMongoose.mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "fyp-pro",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}