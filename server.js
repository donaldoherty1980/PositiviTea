// server.js
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    console.log('Initiating new database connection...');
    await client.connect();
  }
  return client;
}

// Serve static files from 'public' directory
app.use(express.static('public'));

app.get('/api/affirmation', async (req, res) => {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Connected to database. Fetching a random document...');

    const collection = client.db('affirmations').collection('affirmationsbyid');
    console.log('Attempting to aggregate document...');

    const [randomDocument] = await collection.aggregate([
      { $sample: { size: 1 } }
    ]).toArray();

    if (!randomDocument) {
      console.log('No documents found.');
      return res.status(404).json({ error: 'No affirmations found' });
    }

    console.log('Random document fetched successfully:', randomDocument);
    return res.status(200).json({ affirmation: randomDocument.affirmations });
  } catch (error) {
    console.error('An error occurred:', error);
    console.error(error.stack);
    return res.status(500).json({
      error: 'An error occurred while fetching affirmations.',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
