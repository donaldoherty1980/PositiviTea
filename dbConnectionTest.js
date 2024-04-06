import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    console.log(`Connected to database: ${db.databaseName}`);
    // Perform any operations on the database here
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await client.close();
  }
}

run();
