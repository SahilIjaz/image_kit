import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URI!;

if (!mongodbUrl) {
  throw new Error("Connection string ws not found.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    let opts = {
      // bufferCommand: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(mongodbUrl, opts)
      .then(() => mongoose.Connection);
  }

  try {
    cached.conn = cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
