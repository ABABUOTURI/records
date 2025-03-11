import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://ababuoturi:HtF99FHKJUv6ifZb@mycluster.6n6qd.mongodb.net/employee?retryWrites=true&w=majority";
const MONGODB_DB = "employee";   

if (!MONGODB_URI) {
  throw new Error("⚠️ Missing MONGODB_URI in .env file");
}

if (!MONGODB_DB) {
  throw new Error("⚠️ Missing MONGODB_DB in .env file");
}

let cachedClient = null;
let cachedDb = null;

/**
 * Connect to MongoDB
 */
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
