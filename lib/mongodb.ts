import mongoose from 'mongoose';

// Do not use 'as string' here. We let it be string | undefined and handle the error below.
const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
  // Use a standard Error object for better logging and stack trace
  throw new Error("⚠️ Please define MONGODB_URI in your environment variables (e.g., .env.local or Vercel config).");
}

// Define the structure for the global cache
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use 'global' which is the standard Node.js global scope in Next.js
const globalWithMongoose = global as unknown as { mongoose: MongooseGlobal };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Global caching function to ensure Mongoose connection is reused across serverless functions.
 * @returns {Promise<typeof mongoose>} The active Mongoose connection instance.
 */
export async function connectDB() {
  const cached = globalWithMongoose.mongoose;

  if (cached.conn) {
    // Return cached connection if available
    console.log("✅ Using cached Mongoose connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    // Create connection promise only if not already running
    console.log("⏳ Establishing new Mongoose connection...");
    
    // Mongoose recommended options for modern Node.js driver (though often default now)
    const options = {
      dbName: "fyp-pro",
      bufferCommands: false, // Recommended for serverless functions
      // The following are technically deprecated/defaulted but included for explicit compatibility
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    };
    
    // FIX: Use the non-null assertion operator '!' because MONGODB_URI is checked 
    // at the top of the file, guaranteeing it is a string before this point.
    cached.promise = mongoose.connect(MONGODB_URI!, options);
  }

  try {
    // Await the promise to get the connection object and cache it
    cached.conn = await cached.promise;
    console.log("🔥 New Mongoose connection established successfully.");
    return cached.conn;
  } catch (error) {
    // Clear the promise if connection fails, allowing a new attempt later
    cached.promise = null; 
    console.error("❌ Mongoose connection failed:", error);
    throw error;
  }
}
 