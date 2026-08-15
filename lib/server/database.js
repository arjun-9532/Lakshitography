import { MongoClient } from "mongodb";

let clientPromise = globalThis.__lakshitographyMongoClient;

export async function getDatabase() {
  const mongoUrl = process.env.MONGO_URL;
  const databaseName = process.env.DB_NAME;
  if (!mongoUrl) throw new Error("MONGO_URL is not configured.");
  if (!databaseName) throw new Error("DB_NAME is not configured.");

  if (!clientPromise) {
    const client = new MongoClient(mongoUrl);
    clientPromise = client.connect();
    globalThis.__lakshitographyMongoClient = clientPromise;
  }
  const client = await clientPromise;
  return client.db(databaseName);
}
