import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // Explicitly specify the database name here
    const db = client.db('affirmations');
    console.log(`Connected to database: ${db.databaseName}`);
    // You can also perform a test query here if needed
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await client.close();
  }
}

run();
