import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGO_URI;

// Function to connect to the database
function connectToDatabase(uri) {
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

// Async function to handle the API endpoint call.
export default async function handler(req, res) {
  try {
    // Diagnose connection issues with logs
    console.log('Connecting to database...');
    await connectToDatabase(uri);
    console.log('Connected to database. Fetching a random document...');

    const collection = client.db('affirmations').collection('affirmationsbyid');
    
    const [randomDocument] = await collection.aggregate([
      { $sample: { size: 1 } }
    ]).toArray();

    if (!randomDocument) {
      res.status(404).json({ error: 'No affirmations found' });
      return;
    }

    // Log the document retrieval success
    console.log('Random document fetched successfully.');

    res.status(200).json({ affirmation: randomDocument.affirmations });
  } catch (error) {
    // Log the specific error
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while fetching affirmations.' });
  }
  // Do not close the connection, let Vercel freeze or dispose of the function.
}
