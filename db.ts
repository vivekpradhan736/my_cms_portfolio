import mongoose, { Mongoose } from "mongoose";
import { GridFSBucket, Db } from "mongodb";

const URI: string = process.env.MONGO_URI as string;

if (!URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cachedDB: Mongoose | null = null;

const connectDB = async (): Promise<Mongoose> => {
  if (cachedDB) {
    return cachedDB;
  }

  const newDB = await mongoose.connect(URI, {
  });
  cachedDB = newDB;
  return newDB;
};

const getGridFSBucket = async (): Promise<GridFSBucket> => {
  const conn = await connectDB();
  const db = conn.connection.db;

  if (!db) {
    throw new Error("Database connection is not established.");
  }
  return new GridFSBucket(db, { bucketName: "uploads" });
};

export { connectDB, getGridFSBucket };
